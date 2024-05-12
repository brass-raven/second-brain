"use strict";

// src/libs/obsidian/constants/task-status.ts
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
  TaskStatus2["blocked"] = "Blocked";
  TaskStatus2["done"] = "Done";
  TaskStatus2["inProgress"] = "In Progress";
  TaskStatus2["toDo"] = "To Do";
  return TaskStatus2;
})(TaskStatus || {});

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

// src/libs/obsidian/get-task-state.ts
var taskStatusConfig = {
  label: "Status (null to pick on add)",
  options: Object.values(TaskStatus).concat("null"),
  type: "dropdown" /* dropdown */,
  value: "null"
};

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

// src/scripts/Templater/getDailyNote.ts
module.exports = function(oldDateString, shift = 0) {
  const oldDate = /* @__PURE__ */ new Date(`${oldDateString}T00:00:00`);
  const newDate = new Date(oldDate.getTime() + shift * 864e5 /* days */);
  return createDateLink(newDate);
};
