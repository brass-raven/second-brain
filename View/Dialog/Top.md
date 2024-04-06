---
aliases:
  - Top Dialogs
  - Top Quotes
class: View
from:
  - "[[View/Note/Dialog|Dialog]]"
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
    "Speakers",
    "Rating"
  ],
  dv.pages('"Database/Dialog"').sort((page) => {
    return page.rating;
  }, 'desc').slice(
    start,
    start + pageSize
  ).map((page) => [
    page.file.link,
    metadataMenuApi.fieldModifier(dv, page, 'speakers'),
    metadataMenuApi.fieldModifier(dv, page, 'rating')
  ])
);
```
