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

// src/libs/services/term-service.ts
var TermService = class _TermService {
  constructor(_definitionApi, _definitionService, _thesaurusApi, _thesaurusService) {
    this._definitionApi = _definitionApi;
    this._definitionService = _definitionService;
    this._thesaurusApi = _thesaurusApi;
    this._thesaurusService = _thesaurusService;
  }
  static createService({
    definitionApi,
    definitionToken: _d,
    thesaurusApi,
    thesaurusToken: _t
  }) {
    return new _TermService(
      definitionApi,
      new HttpService(definitionApi, [
        (request2) => {
          switch (definitionApi) {
            case DefinitionApi.freeDictionary:
              break;
            default:
              const neverApi = definitionApi;
              throw new Error(`API '${neverApi}' not fully set up`);
          }
          return request2;
        }
      ]),
      thesaurusApi,
      new HttpService(thesaurusApi, [
        (request2) => {
          switch (thesaurusApi) {
            case ThesaurusApi.freeDictionary:
              break;
            default:
              const neverApi = thesaurusApi;
              throw new Error(`Thesaurus API '${neverApi}' not fully set up`);
          }
          return request2;
        }
      ])
    );
  }
  async getDefinition(term) {
    const response = {};
    try {
      switch (this._definitionApi) {
        case DefinitionApi.freeDictionary:
          const definitionSources = await this._definitionService.fetchJson({
            url: term
          });
          if (!(definitionSources instanceof Array)) {
            return null;
          }
          definitionSources.forEach((definitionSource) => {
            definitionSource.meanings.forEach((meaning) => {
              response[meaning.partOfSpeech] = [
                ...response[meaning.partOfSpeech] ?? [],
                ...meaning.definitions.map(({ definition }) => {
                  return definition;
                })
              ];
            });
          });
          break;
        default:
          const neverApi = this._definitionApi;
          throw new Error(`Definition API '${neverApi}' not implemented.`);
      }
    } catch {
    }
    return response;
  }
  async getTerm(term) {
    const [
      definitionResponse,
      thesaurusResponse
    ] = await Promise.all([
      this.getDefinition(term),
      this.getThesaurus(term)
    ]);
    const createTermLink = (term2, inYaml = false) => {
      return createMarkdownLink(
        "Database/Term" /* term */,
        convertCase(term2, "title" /* title */),
        { inYaml }
      );
    };
    const createTermLinks = (terms, inYaml = false) => {
      const uniqueTerms = new Set(terms);
      return createMarkdownArray(
        [...uniqueTerms].map((term2) => {
          return createTermLink(term2, inYaml);
        }).sort(),
        { inYaml }
      );
    };
    const definitions = Object.keys(
      definitionResponse ?? thesaurusResponse ?? {}
    ).map((partOfSpeech) => {
      const definitions2 = definitionResponse?.[partOfSpeech] ?? [];
      const {
        antonyms,
        synonyms
      } = thesaurusResponse?.[partOfSpeech] ?? {};
      return `## ${createTermLink(partOfSpeech)}
` + createMarkdownArray(
        definitions2,
        { inYaml: false }
      ) + (!synonyms?.length ? "" : `

### ${createTermLink("Synonyms")}
` + createTermLinks(synonyms)) + (!antonyms?.length ? "" : `

### ${createTermLink("Antonyms")}
` + createTermLinks(antonyms));
    }).join("\n\n");
    return {
      antonymLinks: createTermLinks(
        Object.values(thesaurusResponse ?? {}).map((partOfSpeech) => {
          return partOfSpeech.antonyms;
        }).flat(),
        true
      ),
      definitions: definitions ? `

${definitions}` : "",
      fileName: createMarkdownFileName(convertCase(term, "title" /* title */)),
      synonymLinks: createTermLinks(
        Object.values(thesaurusResponse ?? {}).map((partOfSpeech) => {
          return partOfSpeech.synonyms;
        }).flat(),
        true
      )
    };
  }
  async getThesaurus(term) {
    const response = {};
    try {
      switch (this._thesaurusApi) {
        case ThesaurusApi.freeDictionary:
          const thesaurusSources = await this._thesaurusService.fetchJson({
            url: term
          });
          if (!(thesaurusSources instanceof Array)) {
            return null;
          }
          thesaurusSources.forEach((thesaurusSource) => {
            thesaurusSource.meanings.forEach((meaning) => {
              response[meaning.partOfSpeech] ??= {
                antonyms: [],
                synonyms: []
              };
              const part = response[meaning.partOfSpeech];
              part.antonyms = [
                ...part.antonyms,
                ...meaning.antonyms,
                ...meaning.definitions.map(({ antonyms }) => {
                  return antonyms;
                }).flat()
              ];
              part.synonyms = [
                ...part.synonyms,
                ...meaning.synonyms,
                ...meaning.definitions.map(({ synonyms }) => {
                  return synonyms;
                }).flat()
              ];
            });
          });
          break;
        default:
          const neverApi = this._thesaurusApi;
          throw new Error(`Definition API '${neverApi}' not implemented.`);
      }
    } catch {
    }
    return response;
  }
};

// src/libs/services/youtube-service.ts
var mediaTypeBackMap = /* @__PURE__ */ new Map([
  ["Channel" /* channel */, "channel" /* channel */],
  ["Video" /* video */, "video" /* video */]
]);

// src/scripts/search-term.ts
async function entry(entryApis, configOptions) {
  const { quickAddApi } = entryApis;
  const createConfig = createSettingsFromOptions(
    configOptions,
    options
  );
  const termService = TermService.createService(createConfig);
  const query = await quickAddApi.inputPrompt(
    `Enter a term`,
    null,
    await getClipboard(quickAddApi)
  );
  if (!query) {
    throw createError("No query entered.");
  }
  entryApis.variables = await termService.getTerm(query);
}
var options = createSettingOptions({
  definitionApi: {
    label: "Definition Api",
    options: Object.values(DefinitionApi),
    type: "dropdown" /* dropdown */,
    value: DefinitionApi.freeDictionary
  },
  definitionToken: {
    label: "Definition Token",
    type: "text" /* text */,
    value: ""
  },
  thesaurusApi: {
    label: "Thesaurus Api",
    options: Object.values(ThesaurusApi),
    type: "dropdown" /* dropdown */,
    value: ThesaurusApi.freeDictionary
  },
  thesaurusToken: {
    label: "Thesaurus Token",
    type: "text" /* text */,
    value: ""
  }
});
module.exports = {
  entry,
  settings: {
    name: "Search Terms",
    author: "Dustin M. Eastway",
    options
  }
};
