---
aliases:
  - Top Shows
class: View
from:
  - "[[View/Note/Movie & Show|Movie & Show]]"
order:
queryConfig:
  columns:
    externalRating: ratingsImdb
    internalRating: ratingsDme
  filterType: Top
  folder: Database/Show
  limit: 100
---
# Notes

```dataviewjs
const { getTaskTable } = require(
  app.vault.adapter.basePath
  + '/Core/Script/Dataview/utilities'
);

getTaskTable({
  dataviewApi: dv,
  obsidianApi: app
}, dv.current().queryConfig);
```
