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

// src/libs/number/convert-rating.ts
function convertRating({
  maxValue,
  minValue,
  value
}) {
  return !value ? null : Math.round(100 * (value - minValue) / (maxValue - minValue));
}

// src/libs/apollo/get-apollo-ref.ts
function getApolloRef(apolloState, refOrEntity) {
  if (!refOrEntity || typeof refOrEntity !== "object" || !("__ref" in refOrEntity)) {
    return refOrEntity;
  }
  return apolloState[refOrEntity.__ref];
}

// src/libs/apollo/get-apollo-ref-factory.ts
function getApolloRefFactory(apolloState) {
  return (refOrEntity) => {
    return getApolloRef(apolloState, refOrEntity);
  };
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

// src/libs/services/types/goodreads/goodreads-media-type.ts
var GoodreadsMediaType = /* @__PURE__ */ ((GoodreadsMediaType2) => {
  GoodreadsMediaType2["author"] = "Author";
  GoodreadsMediaType2["book"] = "Book";
  GoodreadsMediaType2["bookSeries"] = "Book Series";
  return GoodreadsMediaType2;
})(GoodreadsMediaType || {});

// src/libs/services/types/goodreads/raw-goodreads-book-series-books.ts
var RawGoodreadsBookSeriesBooks = {
  is(data) {
    return "series" in data;
  }
};

// src/libs/services/types/goodreads/raw-goodreads-book-series-description.ts
var RawGoodreadsBookSeriesDescription = {
  is(data) {
    return "description" in data;
  }
};

// src/libs/services/types/goodreads/raw-goodreads-book-series-num-works.ts
var RawGoodreadsBookSeriesNumWorks = {
  is(data) {
    return "numWorks" in data;
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

// src/libs/services/goodreads-service.ts
var searches = {
  authorCover: /<meta\b[^>]*?\bitemprop="image"[^>]*?\bcontent="([^"]+)">/,
  authorDescription: /<span id="freeText[^"]*author[\s\S]*?<\/span>/,
  authorId: /goodreads\.com\/author\/show\/(\d+\.[^?]+)/,
  authorSeries: /<div class="seriesDesc"[^>]*>\s*(<span itemprop='name'[\s\S]*?<\/span>)\s*(<span class="bookMeta">[\s\S]*?<\/span>)/g,
  authorTitle: /<h1\b[\s\S]*?\bclass="authorName"[\s\S]*?<\/h1>/,
  seriesData: /\bdata-react-props="([\s\S]*?)"/g
};
var GoodreadsService = class _GoodreadsService {
  constructor(_httpService) {
    this._httpService = _httpService;
  }
  static createService() {
    return new _GoodreadsService(
      new HttpService()
    );
  }
  async getAuthor(url) {
    const authorId = searches.authorId.exec(url)?.[1];
    if (!authorId) {
      throw createError(`Unable to find author ID in URL '${url}'.`);
    }
    url = `https://www.goodreads.com/author/show/${authorId}`;
    const [
      mainContent,
      seriesListContent
    ] = await Promise.all([
      this._httpService.fetch({ url }),
      this._httpService.fetch({
        url: `https://www.goodreads.com/series/list?id=${authorId}`
      })
    ]);
    const cover = searches.authorCover.exec(mainContent)?.[1] ?? "";
    const description = removeHtmlTags(searches.authorDescription.exec(mainContent)?.[0] ?? "");
    const series = getAllMatches(searches.authorSeries, seriesListContent).map(([
      _,
      seriesName
    ]) => {
      return removeHtmlTags(seriesName);
    });
    const title = removeHtmlTags(searches.authorTitle.exec(mainContent)?.[0] ?? "");
    return {
      cover,
      description: description ? `

${description}` : "",
      seriesLinks: createMarkdownArray(
        series,
        { linkDirectory: "Database/BookSeries" /* bookSeries */ }
      ),
      title,
      url
    };
  }
  async getBook(url) {
    const content = await this._httpService.fetch({ url });
    const nextData = JSON.parse(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/.exec(content)?.[1] ?? "{}");
    const { apolloState } = nextData.props.pageProps;
    const bookId = nextData.query.book_id;
    if (!bookId) {
      throw createError("Book ID is missing.");
    }
    const getApolloRef2 = getApolloRefFactory(apolloState);
    const rawBook = Object.values(apolloState).find((entity) => {
      return entity.__typename === "Book" /* book */ && entity.webUrl.endsWith(bookId);
    });
    const authors = [
      rawBook.primaryContributorEdge,
      ...rawBook.secondaryContributorEdges
    ].filter((contributor) => {
      return contributor.role === "Author" /* author */;
    }).map((contributor) => {
      return getApolloRef2(contributor.node).name ?? "";
    });
    const genres = rawBook.bookGenres.map((genre) => {
      return genre.genre.name;
    });
    const isFiction = genres.some((genre) => genre === "Fiction");
    const charactersDirectory = isFiction ? "Database/Character/Fiction" /* characterFiction */ : "Database/Character/Nonfiction" /* characterNonfiction */;
    const seriesLinks = rawBook.bookSeries.map((series) => {
      const { title } = getApolloRef2(series.series);
      return createMarkdownLink(
        "Database/BookSeries" /* bookSeries */,
        createMarkdownFileName(title),
        { alias: `${title} (Book ${series.userPosition})` }
      );
    });
    const work = getApolloRef2(rawBook.work);
    const characters = work.details.characters.map((character) => {
      return character.name;
    });
    const description = removeHtmlTags(rawBook.description);
    return {
      authorLinks: createMarkdownArray(
        authors,
        { linkDirectory: "Database/Author" /* author */ }
      ),
      characterLinks: createMarkdownArray(
        characters,
        { linkDirectory: charactersDirectory }
      ),
      cover: rawBook.imageUrl,
      description: description ? `

${description}` : "",
      genreLinks: createMarkdownArray(
        genres,
        { linkDirectory: "Core/Meta/Genre" /* genre */ }
      ),
      pageCount: rawBook.details.numPages,
      publishedOn: createDateLink(
        work.details.publicationTime,
        { format: 3 /* datetime */ }
      ),
      ratingsGoodreads: this._convertRating(work.stats.averageRating),
      seriesLinks: createMarkdownArray(
        seriesLinks
      ),
      title: rawBook.title,
      url
    };
  }
  async getBookSeries(url) {
    const content = await this._httpService.fetch({ url });
    const seriesData = getAllMatches(searches.seriesData, content).map(([
      _,
      stringData
    ]) => {
      return JSON.parse(
        stringData.replace(/&quot;/g, '"')
      );
    });
    const {
      description: rawDescription,
      title
    } = seriesData.find(RawGoodreadsBookSeriesDescription.is) ?? {};
    const description = removeHtmlTags(rawDescription?.html ?? "");
    const {
      numWorks
    } = seriesData.find(RawGoodreadsBookSeriesNumWorks.is) ?? {};
    const booksData = seriesData.filter(
      RawGoodreadsBookSeriesBooks.is
    );
    const books = booksData.map(({
      series,
      seriesHeaders
    }) => {
      return series.map(({ book: { bookTitleBare: bookTitle } }, index) => {
        bookTitle = removeHtmlTags(bookTitle);
        const bookAlias = `${bookTitle} (${seriesHeaders[index]})`;
        return `## ${bookAlias}

![[${"Database/Book" /* book */}/${bookTitle}#Description]]`;
      }).join("\n\n");
    }).join("\n\n");
    return {
      authorLinks: createMarkdownArray(
        [booksData[0].series[0].book.author.name],
        { linkDirectory: "Database/Author" /* author */ }
      ),
      bookCount: numWorks ?? 0,
      books: books ? `

${books}` : "",
      description: description ? `

${description}` : "",
      title: title ?? "",
      url
    };
  }
  _convertRating(rating) {
    return convertRating({
      maxValue: 5,
      minValue: 1,
      value: rating
    });
  }
};

// src/libs/services/youtube-service.ts
var mediaTypeBackMap = /* @__PURE__ */ new Map([
  ["Channel" /* channel */, "channel" /* channel */],
  ["Video" /* video */, "video" /* video */]
]);

// src/scripts/search-goodreads.ts
async function entry(entryApis, configOptions) {
  const { quickAddApi } = entryApis;
  const {
    mediaType,
    status
  } = createSettingsFromOptions(
    configOptions,
    options
  );
  const goodreadsService = GoodreadsService.createService();
  const query = await quickAddApi.inputPrompt(
    `Enter Goodreads ${mediaType} URL: `,
    null,
    await getClipboard(quickAddApi)
  );
  if (!query) {
    throw createError("No query entered.");
  }
  let item = null;
  if (mediaType === "Author" /* author */) {
    item = await goodreadsService.getAuthor(query);
  } else if (mediaType === "Book" /* book */) {
    item = await goodreadsService.getBook(query);
  } else if (mediaType === "Book Series" /* bookSeries */) {
    item = await goodreadsService.getBookSeries(query);
  }
  entryApis.variables = item == null ? item : {
    ...item,
    fileName: createMarkdownFileName(item.title ?? ""),
    ...mediaType === "Author" /* author */ ? {} : await getWebTaskState(entryApis, status)
  };
}
var options = createSettingOptions({
  mediaType: {
    label: "Media Type",
    options: Object.values(GoodreadsMediaType),
    type: "dropdown" /* dropdown */,
    value: "Book" /* book */
  },
  status: taskStatusConfig
});
module.exports = {
  entry,
  settings: {
    name: "Search Goodreads",
    author: "Dustin M. Eastway",
    options
  }
};
