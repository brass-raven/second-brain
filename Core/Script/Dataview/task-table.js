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

// src/libs/obsidian/get-task-state.ts
var taskStatusConfig = {
  label: "Status (null to pick on add)",
  options: Object.values(TaskStatus).concat("null"),
  type: "dropdown" /* dropdown */,
  value: "null"
};

// src/libs/dataview/query-notes.ts
function queryNotes(dataviewApi, {
  limit,
  page,
  sort,
  source,
  where
}) {
  let pages = typeof source === "string" ? dataviewApi.pages(source) : source;
  if (where) {
    pages = pages.where(where);
  }
  sort?.reverse().forEach(({
    desc,
    property
  }) => {
    pages = pages.sort((page2) => {
      return property(page2);
    }, desc ? "desc" /* desc */ : "asc" /* asc */);
  });
  let {
    number,
    // Fallback to deprecated limit property.
    size = limit
  } = page ?? {};
  if (typeof size === "number" && size >= 0) {
    number = typeof number === "number" && number >= 0 ? number : 0;
    const start = number * size;
    pages = pages.slice(
      start,
      start + size
    );
  }
  return pages;
}

// src/libs/dataview/get-table.ts
async function getTable(dataviewApi, {
  columns,
  ...queryConfig2
}) {
  const pages = queryNotes(dataviewApi, queryConfig2);
  dataviewApi.table(
    columns.map((column) => {
      return column.title;
    }),
    await Promise.all(
      pages.map(async (page) => {
        return columns.map((column) => {
          return column.property(page);
        });
      })
    )
  );
}

// src/libs/dataview/get-task-table.ts
async function getTaskTable(apis, config) {
  const {
    dataviewApi,
    obsidianApi
  } = apis;
  const {
    columns,
    folder,
    limit,
    page
  } = config;
  const {
    "metadata-menu": { api: metadataMenuApi }
  } = obsidianApi.plugins.plugins;
  const filter = getFilter(apis, config);
  const pages = queryNotes(dataviewApi, {
    limit,
    page,
    source: `"${folder}"`,
    sort: filterConfigs([
      !columns?.priority ? null : {
        desc: true,
        property: (page2) => {
          return dataviewApi.page(page2.priority).order;
        }
      },
      !columns?.dueOn ? null : {
        property: (page2) => {
          return page2.dueOn ?? "9999-99-99";
        }
      },
      !columns?.status ? null : {
        desc: true,
        property: (page2) => {
          return dataviewApi.page(page2.status).order;
        }
      },
      !columns?.internalRating ? null : {
        desc: true,
        property: (page2) => {
          return page2[columns.internalRating];
        }
      },
      !columns?.externalRating ? null : {
        desc: true,
        property: (page2) => {
          return page2[columns.externalRating];
        }
      }
    ]),
    where: (page2) => {
      return page2.file.folder === folder && filter(page2);
    }
  });
  let includeCover = false;
  if (pages.length && "cover" in pages[0]) {
    includeCover = true;
  }
  await getTable(dataviewApi, {
    columns: filterConfigs([
      !includeCover ? null : {
        property: (page2) => {
          return `![|200](${page2.cover})`;
        },
        title: "Cover"
      },
      {
        property: (page2) => {
          return page2.file.link;
        },
        title: "Name"
      },
      !columns?.status ? null : {
        property: (page2) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page2, "status");
        },
        title: "Status"
      },
      !columns?.priority ? null : {
        property: (page2) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page2, "priority");
        },
        title: "Priority"
      },
      !columns?.dueOn ? null : {
        property: (page2) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page2, "dueOn");
        },
        title: "Due On"
      },
      !columns?.internalRating ? null : {
        property: (page2) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page2, columns.internalRating);
        },
        title: "Rating"
      },
      !columns?.externalRating ? null : {
        property: (page2) => {
          return page2[columns.externalRating];
        },
        title: convertCase(columns.externalRating, "title" /* title */)
      }
    ]),
    source: pages
  });
}
function filterConfigs(items) {
  return items.filter((item) => {
    return item != null;
  });
}
function getFilter({
  dataviewApi
}, {
  filterType,
  columns: {
    internalRating
  } = {}
}) {
  switch (filterType) {
    case "Abandoned" /* abandoned */:
      return (page) => {
        return page.tags?.includes("abandoned");
      };
    case "To Do" /* toDo */:
      return (page) => {
        const isDone = (innerPage) => {
          return innerPage.tags?.includes("abandoned") || innerPage.status.display === "Done" && !innerPage.tags?.includes("redo");
        };
        return !isDone(page) && (!page.prior || isDone(dataviewApi.page(page.prior)));
      };
    case "Top" /* top */:
      return (page) => {
        return internalRating && page[internalRating] != null || page.status.display === "Done";
      };
    default: {
      const neverType = filterType;
      throw new Error(`Unable to filter type '${neverType}'`);
    }
  }
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

// src/scripts/Dataview/task-table.ts
var { queryConfig } = dv.current();
getTaskTable(
  {
    dataviewApi: dv,
    obsidianApi: app
  },
  queryConfig
);
