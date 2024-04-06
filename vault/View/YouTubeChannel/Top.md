---
aliases:
  - Top YouTube Channels
class: View
from:
  - "[[View/Note/YouTube|YouTube]]"
order:
queryConfig:
  page:
    size: 100
---
# Notes

```dataviewjs
const {
  'metadata-menu': { api: metadataMenuApi }
} = app.plugins.plugins;
const {
  queryConfig: {
    page
  }
} = dv.current();
const pageSize = page.size ?? 10;
const start = pageSize * (page.number ?? 0);

dv.table(
  [
    "Cover",
    "Name",
    "Rating"
  ],
  dv.pages('"Database/YouTubeChannel"').sort((page) => {
    return page.ratingsDme;
  }, 'desc').slice(
    start,
    start + pageSize
  ).map((page) => [
    `![|100](${page.cover})`,
    page.file.link,
    metadataMenuApi.fieldModifier(dv, page, 'ratingsDme')
  ])
);
```
