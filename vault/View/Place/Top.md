---
aliases:
  - Top Places
class: View
from:
  - "[[View/Note/Place|Place]]"
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
    "Name",
    "Address",
    "Rating"
  ],
  dv.pages('"Database/Place"').sort((page) => {
    return page.ratingsDme;
  }, 'desc').slice(
    start,
    start + pageSize
  ).map((page) => [
    page.file.link,
    page.address,
    metadataMenuApi.fieldModifier(dv, page, 'ratingsDme')
  ])
);
```
