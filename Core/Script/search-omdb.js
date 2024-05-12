"use strict";

// src/libs/string/convert-case.ts
function convertCase(value, convertType) {
  const valueArray = value.replace(
    /[^a-zA-Z0-9\n]|([a-z])(?=[A-Z])|(\D)(?=\d)|(\d)(?=\D)/g,
    "$1$2$3 "
  ).trim().toLowerCase().split(/\s+/);
  switch (convertType) {
    case "camel" /* camel */: {
      const words = titleCaseWords(valueArray);
      return [words[0]?.toLowerCase(), ...words.slice(1)].join("");
    }
    case "kebab" /* kebab */:
      return valueArray.join("-");
    case "pascal" /* pascal */:
      return titleCaseWords(valueArray).join("");
    case "snake" /* snake */:
      return valueArray.join("_");
    case "title" /* title */:
      return titleCaseWords(valueArray).join(" ");
    default: {
      const invalidType = convertType;
      throw new Error(`incorrect case type '${invalidType}'`);
    }
  }
}
function titleCaseWords(words) {
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
}

// src/libs/obsidian/constants/task-status.ts
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
  TaskStatus2["blocked"] = "Blocked";
  TaskStatus2["done"] = "Done";
  TaskStatus2["inProgress"] = "In Progress";
  TaskStatus2["toDo"] = "To Do";
  return TaskStatus2;
})(TaskStatus || {});

// src/libs/obsidian/create-error.ts
function createError(message) {
  new Notice(message, 5e3);
  return new Error(message);
}

// src/libs/obsidian/create-setting-options.ts
function createSettingOptions(config) {
  return Object.fromEntries(
    Object.entries(config).map(([
      key,
      option
    ]) => {
      return [
        option.label,
        {
          ...option,
          defaultValue: option.value,
          key
        }
      ];
    })
  );
}

// src/libs/obsidian/create-settings-from-options.ts
function createSettingsFromOptions(config, options2) {
  return Object.fromEntries(
    Object.entries(options2).map(([
      _,
      {
        key,
        label
      }
    ]) => {
      return [key, config[label]];
    })
  );
}

// src/libs/obsidian/get-clipboard.ts
async function getClipboard(quickAddApi) {
  try {
    return await quickAddApi.utility.getClipboard();
  } catch {
    return "";
  }
}

// src/libs/html/remove-html-tags.ts
var tagsSearch = /<!--(?:[\s\S]*?)-->|<([0-9a-zA-Z]+\b)[\s\S]*?>([\s\S]*?)<\/\1>/g;
var characterMap = /* @__PURE__ */ new Map([
  [/&(#39|#x27|apos);/g, "'"],
  [/&#8217;/g, "'"],
  [/&#822[01];/g, '"'],
  [/&amp;/g, "&"],
  [/&gt;/g, "\\>"],
  [/&lt;/g, "\\<"],
  [/​|&nbsp;/g, " "],
  // Escape pound signs.
  [/(\s+)(#\w+\b)/g, "$1\\$2"]
]);
function removeHtmlTags(html) {
  html = html.replace(/<br\b[\s\S]*?\/>/g, "\n");
  while (tagsSearch.test(html)) {
    html = html.replace(tagsSearch, "$2");
  }
  Array.from(characterMap.entries()).forEach(([find, replace]) => {
    html = html.replace(find, replace);
  });
  return html.trim();
}

// src/libs/markdown/create-markdown-file-name.ts
var invalidCharacterSearch = /[\\,#%\{\}\/*<>$\'\":@\|]*/g;
var multiSpaceSearch = /\s\s+/g;
function createMarkdownFileName(fileName) {
  return removeHtmlTags(fileName).replace(
    invalidCharacterSearch,
    ""
  ).replace(
    multiSpaceSearch,
    " "
  );
}

// src/libs/markdown/create-markdown-link.ts
function createMarkdownLink(folder, item, {
  alias,
  inYaml = true
} = {}) {
  item = createMarkdownFileName(item);
  const directory = !folder?.endsWith("/") ? `${folder}/` : folder;
  const link = `[[${directory}${item}|${alias ?? item}]]`;
  return inYaml ? `"${link}"` : link;
}

// src/libs/markdown/create-date-link.ts
function createDateLink(date, config = {}) {
  date = date instanceof Date ? date : new Date(date);
  return createMarkdownLink(
    "Database/DailyNote" /* dailyNote */,
    formatDate(date),
    { alias: formatDate(date, config) }
  );
}

// src/libs/markdown/create-markdown-array.ts
function createMarkdownArray(items, {
  inYaml = true,
  indentation,
  linkDirectory = null,
  prefix = "",
  suffix = ""
} = {}) {
  if (!items?.length) {
    return inYaml ? "null" : "";
  }
  const spaces = "  ".repeat(indentation ?? (inYaml ? 1 : 0));
  return items.map((item) => {
    item = item.trim();
    if (linkDirectory != null) {
      item = createMarkdownLink(linkDirectory, item, {
        inYaml
      });
    }
    return `
${spaces}- ${prefix}${item}${suffix}`;
  }).join("");
}

// src/libs/obsidian/get-task-state.ts
var taskStatusConfig = {
  label: "Status (null to pick on add)",
  options: Object.values(TaskStatus).concat("null"),
  type: "dropdown" /* dropdown */,
  value: "null"
};
async function getWebTaskState(entryApis, status) {
  if (!status || status === "null") {
    const statuses = Object.values(TaskStatus);
    status = await entryApis.quickAddApi.suggester(
      statuses,
      statuses
    );
  }
  const taskState = {
    finishedOn: "null",
    startedOn: "null",
    status: createMarkdownLink("Core/Meta/Status/Basic" /* statusBasic */, status)
  };
  const today = createDateLink(Date.now());
  if (status === "Done" /* done */) {
    taskState.finishedOn = today;
    taskState.startedOn = today;
  } else if (status === "In Progress" /* inProgress */) {
    taskState.startedOn = today;
  }
  return taskState;
}

// src/libs/string/pad.ts
function pad(value, minLength, {
  char = " ",
  end = false
}) {
  value = `${value}`;
  while (value.length < minLength) {
    value = (end ? "" : char) + value + (end ? char : "");
  }
  return value;
}

// src/libs/date/format-date.ts
function formatDate(date, {
  format = 1 /* date */
} = {}) {
  date = date instanceof Date ? date : new Date(date);
  switch (format) {
    case 1 /* date */:
      return innerFormatDate(date);
    case 2 /* time */:
      return innerFormatTime(date);
    case 3 /* datetime */:
      return `${innerFormatDate(date)} ${innerFormatTime(date)}`;
  }
}
function innerFormatDate(date) {
  return [
    pad(date.getFullYear(), 4, { char: "0" }),
    pad(date.getMonth() + 1, 2, { char: "0" }),
    pad(date.getDate(), 2, { char: "0" })
  ].join("-");
}
function innerFormatTime(date) {
  date = date instanceof Date ? date : new Date(date);
  let hours = date.getHours() % 12;
  if (hours === 0) {
    hours = 12;
  }
  return [
    pad(hours, 2, { char: "0" }),
    pad(date.getMinutes(), 2, { char: "0" })
  ].join(":") + ` ${date.getHours() < 12 ? "AM" : "PM"}`;
}

// src/libs/number/convert-rating.ts
function convertRating({
  maxValue,
  minValue,
  value
}) {
  return !value ? null : Math.round(100 * (value - minValue) / (maxValue - minValue));
}

// src/libs/object/camel-case-object.ts
function camelCaseObject(item) {
  if (item == null || typeof item !== "object") {
    return item;
  } else if (item instanceof Array) {
    return item.map(camelCaseObject);
  }
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => {
      return [
        convertCase(key, "camel" /* camel */),
        camelCaseObject(value)
      ];
    }).sort(([a], [b]) => {
      return a.localeCompare(b);
    })
  );
}

// src/libs/services/http-service.ts
var HttpService = class {
  constructor(_baseUrl = null, _adapters = []) {
    this._baseUrl = _baseUrl;
    this._adapters = _adapters;
  }
  async fetch(requestConfig) {
    const {
      body,
      headers,
      method,
      query,
      url
    } = await this._adaptRequest(requestConfig);
    const urlBuilder = new URL(url);
    Object.entries(query ?? {}).forEach(([key, value]) => {
      urlBuilder.searchParams.append(key, `${value}`);
    });
    return request({
      body,
      headers,
      method,
      url: urlBuilder.href
    });
  }
  async fetchJson(requestConfig) {
    return JSON.parse(
      await this.fetch(requestConfig)
    );
  }
  async _adaptRequest(requestConfig) {
    if (this._baseUrl) {
      requestConfig.url = `${this._baseUrl}/${requestConfig.url}`;
    }
    for (const adapter of this._adapters) {
      requestConfig = await (typeof adapter === "function" ? adapter(requestConfig) : adapter.adaptHttpRequest(requestConfig));
    }
    return requestConfig;
  }
};

// src/libs/services/types/omdb/omdb-media-type.ts
var OmdbMediaType = /* @__PURE__ */ ((OmdbMediaType2) => {
  OmdbMediaType2["game"] = "Game";
  OmdbMediaType2["movie"] = "Movie";
  OmdbMediaType2["show"] = "Show";
  return OmdbMediaType2;
})(OmdbMediaType || {});

// src/libs/services/types/term/definition-api.ts
var DefinitionApi = ((DefinitionApi2) => {
  DefinitionApi2["freeDictionary"] = `${"https://api.dictionaryapi.dev/api/v2/entries/en_US" /* freeDictionary */}`;
  return DefinitionApi2;
})(DefinitionApi || {});

// src/libs/services/types/term/thesaurus-api.ts
var ThesaurusApi = ((ThesaurusApi2) => {
  ThesaurusApi2["freeDictionary"] = `${"https://api.dictionaryapi.dev/api/v2/entries/en_US" /* freeDictionary */}`;
  return ThesaurusApi2;
})(ThesaurusApi || {});

// src/libs/services/omdb-service.ts
var OmdbService = class _OmdbService {
  constructor(_httpService) {
    this._httpService = _httpService;
  }
  static createService({
    apiKey,
    apiUrl
  }) {
    return new _OmdbService(
      new HttpService(
        null,
        [(requestConfig) => {
          requestConfig.url = `${apiUrl}/${requestConfig.url}`;
          requestConfig.query ??= {};
          requestConfig.query.apikey = apiKey;
          return requestConfig;
        }]
      )
    );
  }
  convertTitle({
    title,
    year
  }) {
    return `${title} (${year})`;
  }
  async getById(id) {
    const response = await this._httpService.fetchJson({
      query: { i: id },
      url: ""
    });
    if (!response) {
      throw createError("No results found.");
    }
    return this._convert(response);
  }
  async getByQuery(query, mediaType) {
    const response = ((await this._httpService.fetchJson({
      query: { s: query },
      url: ""
    }))?.Search ?? []).map((item) => {
      return this._convert(item);
    }).filter((item) => {
      return item.type === mediaType;
    });
    if (!response.length) {
      throw createError("No results found.");
    }
    return response;
  }
  _convert(item) {
    item = camelCaseObject(item);
    const {
      actors,
      director,
      genre,
      imdbRating,
      plot,
      released
    } = item;
    const type = this._convertType(item.type);
    return {
      ...item,
      actorLinks: this._convertArray(actors, "Database/Character/Nonfiction" /* characterNonfiction */),
      directorLinks: this._convertArray(director, "Database/Character/Nonfiction" /* characterNonfiction */),
      fileName: createMarkdownFileName(
        this.convertTitle(item)
      ),
      genreLinks: this._convertArray(genre, "Core/Meta/Genre" /* genre */),
      imdbRating: this._convertRating(imdbRating),
      plot: plot ? `

${plot}` : "",
      publishedOn: createDateLink(released),
      type
    };
  }
  _convertArray(itemsString, linkDirectory) {
    return createMarkdownArray(
      itemsString === "N/A" ? null : itemsString?.split(","),
      { linkDirectory }
    ) ?? "";
  }
  _convertRating(rating) {
    return convertRating({
      maxValue: 10,
      minValue: 1,
      value: rating
    });
  }
  _convertType(type) {
    switch (type) {
      case "game":
        return "Game" /* game */;
      case "movie":
        return "Movie" /* movie */;
      case "series":
        return "Show" /* show */;
    }
    throw createError(`Unknown media type '${type}'.`);
  }
};

// src/libs/services/youtube-service.ts
var mediaTypeBackMap = /* @__PURE__ */ new Map([
  ["Channel" /* channel */, "channel" /* channel */],
  ["Video" /* video */, "video" /* video */]
]);

// src/scripts/search-omdb.ts
var ApiUrl = /* @__PURE__ */ ((ApiUrl2) => {
  ApiUrl2["omdb"] = "https://www.omdbapi.com";
  return ApiUrl2;
})(ApiUrl || {});
var imdbIdSearch = /.*\b(tt\d+)\b.*/;
async function entry(entryApis, configOptions) {
  const { quickAddApi } = entryApis;
  const {
    apiKey,
    apiUrl,
    mediaType,
    status
  } = createSettingsFromOptions(
    configOptions,
    options
  );
  const omdbService = OmdbService.createService({
    apiKey,
    apiUrl
  });
  let query = await quickAddApi.inputPrompt(
    "Enter a query or IMDB ID: ",
    null,
    await getClipboard(quickAddApi)
  );
  if (!query) {
    throw createError("No query entered.");
  }
  if (imdbIdSearch.test(query)) {
    query = query.replace(imdbIdSearch, "$1");
  } else {
    const options2 = await omdbService.getByQuery(query, mediaType);
    const choice = options2.length === 1 ? options2[0] : await quickAddApi.suggester(
      options2.map((item) => omdbService.convertTitle(item)),
      options2
    );
    if (!choice) {
      throw createError("No choice selected.");
    }
    query = choice.imdbId;
  }
  entryApis.variables = {
    ...await omdbService.getById(query),
    ...await getWebTaskState(entryApis, status)
  };
}
var options = createSettingOptions({
  apiKey: {
    label: "API Key",
    type: "text" /* text */,
    value: ""
  },
  apiUrl: {
    label: "API URL",
    options: Object.values(ApiUrl),
    type: "dropdown" /* dropdown */,
    value: "https://www.omdbapi.com" /* omdb */
  },
  mediaType: {
    label: "Media Type",
    options: Object.values(OmdbMediaType),
    type: "dropdown" /* dropdown */,
    value: "Movie" /* movie */
  },
  status: taskStatusConfig
});
module.exports = {
  entry,
  settings: {
    name: "Search OMDB",
    author: "Dustin M. Eastway",
    options
  }
};
