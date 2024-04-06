---
aliases:
  - Abandoned Book Series
class: View
from:
  - "[[View/Note/Book|Book]]"
order: 
queryConfig:
  columns:
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/BookSeries
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
