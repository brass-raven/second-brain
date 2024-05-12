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

// src/libs/services/types/igdb/igdb-media-type.ts
var IgdbMediaType = /* @__PURE__ */ ((IgdbMediaType2) => {
  IgdbMediaType2["game"] = "Game";
  IgdbMediaType2["gameSeries"] = "GameSeries";
  return IgdbMediaType2;
})(IgdbMediaType || {});

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

// src/libs/services/twitch-service.ts
var TwitchService = class _TwitchService {
  constructor(_config, _httpService) {
    this._config = _config;
    this._httpService = _httpService;
    this._token = this._getToken();
  }
  get token() {
    return this._token;
  }
  static createService(config) {
    return new _TwitchService(
      config,
      new HttpService("https://id.twitch.tv")
    );
  }
  async _getToken() {
    const { clientId, clientSecret } = this._config;
    return camelCaseObject(
      await this._httpService.fetchJson({
        body: void 0,
        query: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials"
        },
        method: "POST" /* post */,
        url: "oauth2/token"
      })
    ).accessToken;
  }
};

// src/libs/services/igdb-service.ts
var IgdbService = class _IgdbService {
  constructor(_httpService) {
    this._httpService = _httpService;
  }
  static createService(config) {
    const twitchService = TwitchService.createService(config);
    return new _IgdbService(
      new HttpService(
        "https://api.igdb.com/v4",
        [async (requestConfig) => {
          const token = await twitchService.token;
          requestConfig.headers ??= {};
          requestConfig.headers["Authorization"] = `Bearer ${token}`;
          requestConfig.headers["Client-ID"] = config.clientId;
          return requestConfig;
        }]
      )
    );
  }
  async getGame(id) {
    const games = camelCaseObject(
      await this._httpService.fetchJson({
        body: `
          fields
            cover.url,
            first_release_date,
            franchises.name,
            game_engines.name,
            genres.name,
            involved_companies.company.name,
            involved_companies.developer,
            involved_companies.publisher,
            name,
            platforms.name,
            remakes.name,
            remakes.first_release_date,
            remasters.name,
            remasters.first_release_date,
            similar_games.name,
            similar_games.first_release_date,
            summary,
            themes.name,
            total_rating,
            url
          ;
          where id=${id};
        `,
        method: "POST" /* post */,
        url: "games"
      })
    );
    if (games.length !== 1) {
      throw new Error(`ID matched ${games.length} games!`);
    }
    return this._convertGame(games[0]);
  }
  async searchGameSeries(query) {
    return camelCaseObject(
      await this._httpService.fetchJson({
        body: `
          fields
            games.id,
            games.first_release_date,
            games.name,
            name,
            url
          ;
          where name ~ *"${query}"*;
        `,
        method: "POST" /* post */,
        url: "franchises"
      })
    ).map((gameSeries) => this._convertGameSeries(gameSeries));
  }
  async searchGames(query) {
    return camelCaseObject(
      await this._httpService.fetchJson({
        body: `
          fields
            id,
            first_release_date,
            name
          ;
          search "${query}";
        `,
        method: "POST" /* post */,
        url: "games"
      })
    ).map((item) => this._convertSearchGame(item));
  }
  _convertDate(date) {
    return new Date(date * 1e3 + 864e5 /* days */);
  }
  _convertGame(item) {
    const {
      cover: {
        url: cover
      },
      firstReleaseDate,
      franchises,
      gameEngines,
      genres,
      involvedCompanies,
      platforms,
      remakes,
      remasters,
      similarGames,
      summary: description,
      themes,
      totalRating,
      url
    } = item;
    const createNameArray = (items, linkDirectory) => {
      return createMarkdownArray(
        items?.map(({ name }) => {
          return createMarkdownFileName(name);
        }),
        { linkDirectory }
      );
    };
    const createGameArray = (games) => {
      return createNameArray(
        games?.map((game) => {
          return {
            name: this._convertSearchGame(game).fileName
          };
        }),
        "Database/VideoGame" /* videoGame */
      );
    };
    return {
      ...this._convertSearchGame(item),
      consoleLinks: createNameArray(
        platforms,
        "Core/Meta/VideoGameConsole" /* videoGameConsole */
      ),
      cover: `https:${cover}`.replace("t_thumb", "t_cover_big"),
      description: description ? `

${description}` : "",
      developerLinks: createNameArray(
        involvedCompanies?.filter(({ developer }) => {
          return developer;
        }).map(({ company }) => {
          return company;
        }),
        "Core/Meta/Company" /* company */
      ),
      engineLinks: createNameArray(
        gameEngines,
        "Core/Meta/VideoGameEngine" /* videoGameEngine */
      ),
      genreLinks: createNameArray(
        themes,
        "Core/Meta/Genre" /* genre */
      ),
      publisherLinks: createNameArray(
        involvedCompanies?.filter(({ publisher }) => {
          return publisher;
        }).map(({ company }) => {
          return company;
        }),
        "Core/Meta/Company" /* company */
      ),
      ratingsIgdb: totalRating ? Math.round(totalRating) : "null",
      releaseDate: createDateLink(this._convertDate(firstReleaseDate)),
      remakeLinks: createGameArray(remakes),
      remasterLinks: createGameArray(remasters),
      seriesLinks: createNameArray(
        franchises,
        "Database/VideoGameSeries" /* videoGameSeries */
      ),
      similarGameLinks: createGameArray(similarGames),
      typeLinks: createNameArray(
        genres,
        "Core/Meta/Type/VideoGame" /* videoGameType */
      ),
      url
    };
  }
  _convertGameSeries(gameSeries) {
    const {
      games,
      name,
      url
    } = gameSeries;
    return {
      fileName: createMarkdownFileName(name),
      gameLinks: !games?.length ? "" : "\n\n" + games.map((game) => {
        const { fileName } = this._convertSearchGame(game);
        return `## ${fileName}

![[${"Database/VideoGame" /* videoGame */}/${fileName}]]`;
      }).join("\n\n"),
      url
    };
  }
  _convertSearchGame(item) {
    const { firstReleaseDate, id, name } = item;
    const year = this._convertDate(firstReleaseDate).getFullYear();
    return {
      fileName: createMarkdownFileName(`${name} (${year})`),
      id
    };
  }
};

// src/libs/services/youtube-service.ts
var mediaTypeBackMap = /* @__PURE__ */ new Map([
  ["Channel" /* channel */, "channel" /* channel */],
  ["Video" /* video */, "video" /* video */]
]);

// src/scripts/search-igdb.ts
async function entry(entryApis, configOptions) {
  const { quickAddApi } = entryApis;
  const {
    clientId,
    clientSecret,
    mediaType,
    status
  } = createSettingsFromOptions(
    configOptions,
    options
  );
  const igdbService = IgdbService.createService({
    clientId,
    clientSecret
  });
  const query = await quickAddApi.inputPrompt(
    `Enter a ${mediaType} query`,
    null,
    await getClipboard(quickAddApi)
  );
  if (!query) {
    throw createError("No query entered.");
  }
  const items = mediaType === "Game" /* game */ ? await igdbService.searchGames(query) : await igdbService.searchGameSeries(query);
  const choice = items.length === 1 ? items[0] : await quickAddApi.suggester(
    items.map((item2) => item2.fileName),
    items
  );
  if (!choice) {
    throw createError("No choice selected.");
  }
  const item = "gameLinks" in choice ? choice : await igdbService.getGame(choice.id);
  entryApis.variables = {
    ...item,
    ...await getWebTaskState(entryApis, status)
  };
}
var options = createSettingOptions({
  clientId: {
    label: "Twitch Client ID",
    type: "text" /* text */,
    value: ""
  },
  clientSecret: {
    label: "Twitch Client Secret",
    type: "text" /* text */,
    value: ""
  },
  mediaType: {
    label: "Media Type",
    options: Object.values(IgdbMediaType),
    type: "dropdown" /* dropdown */,
    value: "Game" /* game */
  },
  status: taskStatusConfig
});
module.exports = {
  entry,
  settings: {
    name: "Search IGDB",
    author: "Dustin M. Eastway",
    options
  }
};
