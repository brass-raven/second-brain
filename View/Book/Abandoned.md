---
aliases:
  - Abandoned Books
class: View
from:
  - "[[View/Note/Book|Book]]"
order:
queryConfig:
  columns:
    externalRating: ratingsGoodreads
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/Book
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
