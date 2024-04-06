---
aliases:
  - Books To Read
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
  filterType: To Do
  folder: Database/Book
  limit: 25
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
