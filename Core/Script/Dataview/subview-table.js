"use strict";

// src/libs/array/filter-null.ts
function filterNull(items) {
  return items.filter((item) => {
    return item != null;
  });
}

// src/libs/obsidian/constants/task-status.ts
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
  TaskStatus2["blocked"] = "Blocked";
  TaskStatus2["done"] = "Done";
  TaskStatus2["inProgress"] = "In Progress";
  TaskStatus2["toDo"] = "To Do";
  return TaskStatus2;
})(TaskStatus || {});

// src/libs/obsidian/get-note-name.ts
function getNoteName(page) {
  return page.aliases?.[0] ?? page.file.name;
}

// src/libs/obsidian/get-task-state.ts
var taskStatusConfig = {
  label: "Status (null to pick on add)",
  options: Object.values(TaskStatus).concat("null"),
  type: "dropdown" /* dropdown */,
  value: "null"
};

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

// src/scripts/Dataview/subview-table.ts
var current = dv.current();
var pages = dv.pages(input?.source ?? '"View"').filter((page) => {
  return page.from?.some((link) => {
    return link.path === current.file.path;
  });
});
var displayDiscription = pages.some((page) => {
  return page.description;
});
dv.table(
  filterNull([
    "Name",
    displayDiscription ? "Description" : null
  ]),
  pages.sort((page) => {
    return page.order ?? 0;
  }, "desc" /* desc */).sort((page) => {
    return getNoteName(page);
  }, input?.nameOrder ?? "asc" /* asc */).map((page) => {
    return filterNull([
      `[[${page.file.path}|${getNoteName(page)}]]`,
      displayDiscription ? page.description ?? "" : null
    ]);
  })
);
