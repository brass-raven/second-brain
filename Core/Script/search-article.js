"use strict";

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

// src/libs/html/get-html-headers.ts
var headersSearch = /<(h(\d)\b)[\s\S]*?>([\s\S]+?)<\/\1>/g;
function getHtmlHeaders(html) {
  const matches = getAllMatches(headersSearch, html);
  return matches.map(([_fullMatch, _tag, depth, content]) => {
    return {
      content: removeHtmlTags(content),
      level: parseInt(depth, 10)
    };
  });
}

// src/libs/html/get-html-title.ts
var titleSearch = /<head\b[\s\S]*<title\b[^>]*>(.*?)</;
function getHtmlTitle(html) {
  const title = titleSearch.exec(html)?.[1];
  return !title ? null : title;
}

// src/libs/html/get-js-weekly-headers.ts
var headersSearch2 = /<span [^>]*class="mainlink"[^>]*>[\s\S]*?<a [^>]*href="([^"]+)"[^>]*>([\s\S]+?)<\/a>/g;
function getJsWeeklyHeaders(html) {
  const matches = getAllMatches(headersSearch2, html);
  return matches.map(([_fullMatch, url, title]) => {
    return {
      content: removeHtmlTags(title),
      level: 1,
      url
    };
  });
}

// src/libs/html/get-wikipedia-headers.ts
function getWikipediaHeaders(html) {
  const headers = getHtmlHeaders(html);
  if (headers[0].content === "Contents") {
    headers.splice(0, 1);
  }
  if (headers[0].level === 1) {
    headers[0].content = "Chapters";
    headers.splice(1, 0, {
      content: "Description",
      level: 2
    });
  }
  headers.forEach((header) => {
    header.content = header.content.replace(/\s*\[edit\]\s*$/, "");
  });
  return headers;
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

// src/libs/markdown/create-markdown-headers.ts
function createMarkdownHeaders(headers) {
  return headers.map(({
    content,
    level,
    url
  }) => {
    const headerPrefix = "#".repeat(level);
    let header = `
${headerPrefix} ${removeHtmlTags(content)}`;
    if (url) {
      header += `

[Link](${url})`;
    }
    return header;
  }).join("\n");
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

// src/libs/string/get-all-matches.ts
function getAllMatches(regex, text) {
  const matches = [];
  if (!regex.global) {
    throw createError('Provided regex must have the "global" flag enabled.');
  }
  let match;
  do {
    match = regex.exec(text);
    if (match) {
      matches.push(match);
    }
  } while (match);
  return matches;
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

// src/libs/services/youtube-service.ts
var mediaTypeBackMap = /* @__PURE__ */ new Map([
  ["Channel" /* channel */, "channel" /* channel */],
  ["Video" /* video */, "video" /* video */]
]);

// src/scripts/search-article.ts
var headerGetters = [
  {
    search: /\bjavascriptweekly\.com\b/,
    getter: getJsWeeklyHeaders
  },
  {
    search: /\bwikipedia\.org\b/,
    getter: getWikipediaHeaders
  }
];
async function entry(entryApis, configOptions) {
  const { quickAddApi } = entryApis;
  const {
    status
  } = createSettingsFromOptions(
    configOptions,
    options
  );
  const query = await quickAddApi.inputPrompt(
    "Enter article URL: ",
    null,
    await getClipboard(quickAddApi)
  );
  if (!query) {
    throw createError("No query entered.");
  }
  const response = await request({
    url: query,
    method: "GET" /* get */
  });
  const headerGetter = headerGetters.find(({ search }) => {
    return search.test(query);
  })?.getter ?? getHtmlHeaders;
  const headers = createMarkdownHeaders(
    headerGetter(response).map((header) => {
      header.level += 1;
      return header;
    })
  );
  entryApis.variables = {
    headers: headers ? `
${headers}` : "",
    fileName: createMarkdownFileName(getHtmlTitle(response) ?? ""),
    url: query,
    ...await getWebTaskState(entryApis, status === "null" ? null : status)
  };
}
var options = createSettingOptions({
  status: taskStatusConfig
});
module.exports = {
  entry,
  settings: {
    name: "Search article",
    author: "Dustin M. Eastway",
    options
  }
};
