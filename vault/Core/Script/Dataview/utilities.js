"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/scripts/Dataview/utilities.ts
var utilities_exports = {};
__export(utilities_exports, {
  getTable: () => getTable,
  getTaskTable: () => getTaskTable
});
module.exports = __toCommonJS(utilities_exports);

// src/libs/dataview/query-notes.ts
function queryNotes(dataviewApi, {
  limit,
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
    pages = pages.sort((page) => {
      return property(page);
    }, desc ? "desc" /* desc */ : "asc" /* asc */);
  });
  if (typeof limit === "number") {
    pages = pages.limit(limit);
  }
  return pages;
}

// src/libs/dataview/get-table.ts
async function getTable(dataviewApi, {
  columns,
  ...queryConfig
}) {
  const pages = queryNotes(dataviewApi, queryConfig);
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

// src/libs/dataview/get-task-table.ts
async function getTaskTable(apis, config) {
  const {
    dataviewApi,
    obsidianApi
  } = apis;
  const {
    folder,
    columns,
    limit
  } = config;
  const {
    "metadata-menu": { api: metadataMenuApi }
  } = obsidianApi.plugins.plugins;
  const filter = getFilter(apis, config);
  const pages = queryNotes(dataviewApi, {
    limit,
    source: `"${folder}"`,
    sort: filterConfigs([
      !columns?.priority ? null : {
        desc: true,
        property: (page) => {
          return dataviewApi.page(page.priority).order;
        }
      },
      !columns?.dueOn ? null : {
        property: (page) => {
          return page.dueOn ?? "9999-99-99";
        }
      },
      !columns?.status ? null : {
        desc: true,
        property: (page) => {
          return dataviewApi.page(page.status).order;
        }
      },
      !columns?.internalRating ? null : {
        desc: true,
        property: (page) => {
          return page[columns.internalRating];
        }
      },
      !columns?.externalRating ? null : {
        desc: true,
        property: (page) => {
          return page[columns.externalRating];
        }
      }
    ]),
    where: (page) => {
      return page.file.folder === folder && filter(page);
    }
  });
  let includeCover = false;
  if (pages.length && "cover" in pages[0]) {
    includeCover = true;
  }
  await getTable(dataviewApi, {
    columns: filterConfigs([
      !includeCover ? null : {
        property: (page) => {
          return `![|200](${page.cover})`;
        },
        title: "Cover"
      },
      {
        property: (page) => {
          return page.file.link;
        },
        title: "Name"
      },
      !columns?.status ? null : {
        property: (page) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page, "status");
        },
        title: "Status"
      },
      !columns?.priority ? null : {
        property: (page) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page, "priority");
        },
        title: "Priority"
      },
      !columns?.dueOn ? null : {
        property: (page) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page, "dueOn");
        },
        title: "Due On"
      },
      !columns?.internalRating ? null : {
        property: (page) => {
          return metadataMenuApi.fieldModifier(dataviewApi, page, columns.internalRating);
        },
        title: "Rating"
      },
      !columns?.externalRating ? null : {
        property: (page) => {
          return page[columns.externalRating];
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
        return !page.tags?.includes("abandoned") && (page.status.display !== "Done" || page.tags?.includes("redo")) && (!page.prior || dataviewApi.page(page.prior).status.display === "Done");
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
