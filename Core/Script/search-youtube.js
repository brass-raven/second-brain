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

// src/libs/number/convert-timestamp.ts
function convertTimestamp(timeInMs) {
  const hours = Math.floor(timeInMs / 36e5 /* hours */);
  const minutes = Math.floor(timeInMs % 36e5 /* hours */ / 6e4 /* minutes */);
  const seconds = Math.round(timeInMs % 6e4 /* minutes */ / 1e3 /* seconds */);
  const times = [
    minutes,
    seconds
  ];
  if (hours > 0) {
    times.unshift(hours);
  }
  return times.map((time) => {
    return pad(time, 2, { char: "0" });
  }).join(":");
}

// src/libs/services/constants/youtube.ts
var youtubeUrl = "https://www.youtube.com";

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

// src/libs/services/types/youtube/youtube-media-type.ts
var YoutubeMediaType = /* @__PURE__ */ ((YoutubeMediaType2) => {
  YoutubeMediaType2["channel"] = "Channel";
  YoutubeMediaType2["video"] = "Video";
  return YoutubeMediaType2;
})(YoutubeMediaType || {});

// src/libs/services/youtube-service.ts
var rawDataSearch = /ytInitialData\s*=\s*({[\s\S]+?});\s*<\/script>/;
var mediaTypeBackMap = /* @__PURE__ */ new Map([
  ["Channel" /* channel */, "channel" /* channel */],
  ["Video" /* video */, "video" /* video */]
]);
var YoutubeService = class _YoutubeService {
  constructor(_apiHttpService, _baseHttpService, _mediaType) {
    this._apiHttpService = _apiHttpService;
    this._baseHttpService = _baseHttpService;
    this._mediaType = _mediaType;
  }
  static createService({
    apiKey,
    apiUrl,
    mediaType
  }) {
    return new _YoutubeService(
      new HttpService(
        apiUrl,
        [(requestConfig) => {
          requestConfig.query ??= {};
          requestConfig.query.key = apiKey;
          return requestConfig;
        }]
      ),
      new HttpService(youtubeUrl),
      mediaType
    );
  }
  async getChannel(id) {
    const channels = (await this._apiHttpService.fetchJson({
      query: {
        id,
        part: "brandingSettings,id,snippet"
      },
      url: "channels"
    })).items ?? [];
    return channels.length ? this._convertChannel(channels[0]) : null;
  }
  async getVideo(id) {
    const videos = (await this._apiHttpService.fetchJson({
      query: {
        id,
        part: "id,snippet"
      },
      url: "videos"
    })).items;
    if (videos.length !== 1) {
      throw new Error(`Expected 1 video but got ${videos.length}`);
    }
    const video = videos[0];
    const videoData = JSON.parse(
      rawDataSearch.exec(
        await this._baseHttpService.fetch({ url: `watch?v=${id}` })
      )?.[1] ?? "null"
    );
    return video ? this._convertVideo(
      video,
      videoData
    ) : null;
  }
  async search(query) {
    return ((await this._apiHttpService.fetchJson({
      query: {
        maxResults: 10,
        part: "snippet",
        q: query,
        type: this._convertMediaTypeBack(this._mediaType)
      },
      url: "search"
    })).items ?? []).map((item) => {
      return this._convertSearch(item);
    });
  }
  _convertChannel(channel) {
    const {
      id,
      snippet: {
        customUrl,
        localized: {
          description,
          title
        },
        thumbnails: {
          default: {
            url: defaultThumbnail
          },
          high: {
            url: highThumbnail
          }
        }
      },
      brandingSettings: {
        image: {
          bannerExternalUrl
        } = {}
      }
    } = channel;
    return {
      banner: bannerExternalUrl ?? "null",
      description: description ? `

${removeHtmlTags(description)}` : "",
      id,
      url: `${youtubeUrl}/${customUrl}`,
      thumbnail: highThumbnail ?? defaultThumbnail,
      title
    };
  }
  _convertMediaTypeBack(mediaType) {
    const rawMediaType = mediaTypeBackMap.get(mediaType);
    if (rawMediaType) {
      return rawMediaType;
    }
    throw createError(
      `Unable to convert media type '${mediaType}'.`
    );
  }
  _convertSearch(search) {
    const id = Object.entries(search.id).find(([key]) => {
      return key === "id" || key.endsWith("Id");
    })[1];
    const {
      snippet: {
        description,
        title
      }
    } = search;
    return {
      description,
      id,
      title
    };
  }
  _convertVideo(video, videoData) {
    const {
      id,
      snippet: {
        channelTitle,
        localized: {
          title
        },
        thumbnails: {
          default: {
            url: defaultThumbnail
          },
          high: {
            url: highThumbnail
          }
        }
      }
    } = video;
    const url = `${youtubeUrl}/watch?v=${id}`;
    const { localized, publishedAt } = video.snippet;
    const { description } = localized;
    const { markersMap } = videoData.playerOverlays.playerOverlayRenderer.decoratedPlayerBarRenderer?.decoratedPlayerBarRenderer.playerBar.multiMarkersPlayerBarRenderer ?? {};
    const chapters = markersMap?.find(({ key }) => {
      return key === "AUTO_CHAPTERS" /* autoChapters */ || key === "DESCRIPTION_CHAPTERS" /* descriptionChapters */;
    })?.value?.chapters?.map(({
      chapterRenderer: {
        timeRangeStartMillis: timeInMs,
        title: { simpleText }
      }
    }) => {
      const timeInSeconds = Math.round(timeInMs / 1e3 /* seconds */);
      return `## ${simpleText} ([${convertTimestamp(timeInMs)}](${url}&t=${timeInSeconds}))`;
    }).join("\n\n") ?? "";
    return {
      channel: channelTitle,
      channelLink: createMarkdownLink(
        "Database/YouTubeChannel" /* youTubeChannel */,
        channelTitle
      ),
      chapters: chapters ? `

${chapters}` : "",
      description: description ? (
        // Escape tags to keep them from mixing in with Obsidian tags.
        `

${removeHtmlTags(description)}`
      ) : "",
      id,
      publishedOn: createDateLink(
        publishedAt,
        { format: 3 /* datetime */ }
      ),
      thumbnail: highThumbnail ?? defaultThumbnail,
      title,
      url
    };
  }
};

// src/scripts/search-youtube.ts
var ApiUrl = /* @__PURE__ */ ((ApiUrl2) => {
  ApiUrl2["youtubeV3"] = "https://www.googleapis.com/youtube/v3";
  return ApiUrl2;
})(ApiUrl || {});
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
  const youtubeService = YoutubeService.createService({
    apiKey,
    apiUrl,
    mediaType
  });
  let query = await quickAddApi.inputPrompt(
    `Enter a search for ${mediaType}: `,
    null,
    await getClipboard(quickAddApi)
  );
  if (!query) {
    throw createError("No query entered.");
  }
  const videoId = new RegExp(`${youtubeUrl}/watch\\?.*\\bv=([^&]+)`).exec(query)?.[1];
  if (videoId) {
    query = videoId;
  } else if (query.startsWith(`${youtubeUrl}/`)) {
    query = query.slice(youtubeUrl.length + 1);
  }
  const search = async () => {
    const options2 = await youtubeService.search(query);
    const choice = options2.length === 1 ? options2[0] : await quickAddApi.suggester(
      options2.map(({ description, title }) => {
        return `${title} - ${description}`;
      }),
      options2
    );
    if (!choice) {
      throw createError("No choice selected.");
    }
    return choice;
  };
  switch (mediaType) {
    case "Channel" /* channel */: {
      const { id } = await search();
      entryApis.variables = await youtubeService.getChannel(id);
      break;
    }
    case "Video" /* video */: {
      let item = await youtubeService.getVideo(query);
      if (!item) {
        const { id } = await search();
        item = await youtubeService.getVideo(id);
      }
      entryApis.variables = {
        ...item,
        ...await getWebTaskState(entryApis, status)
      };
      break;
    }
    default:
      throw createError(`Unknown mediaType '${mediaType}' provided.`);
  }
  if (entryApis.variables == null) {
    throw createError(`Unable to find selected YouTube ${mediaType}.`);
  }
  if (typeof entryApis.variables?.title === "string") {
    entryApis.variables.fileName = createMarkdownFileName(
      entryApis.variables.title
    );
  }
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
    value: "https://www.googleapis.com/youtube/v3" /* youtubeV3 */
  },
  mediaType: {
    label: "Media Type",
    options: Object.values(YoutubeMediaType),
    type: "dropdown" /* dropdown */,
    value: "Video" /* video */
  },
  status: taskStatusConfig
});
module.exports = {
  entry,
  settings: {
    name: "Search YouTube",
    author: "Dustin M. Eastway",
    options
  }
};
