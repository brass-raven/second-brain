---
aliases:
  - Abandoned Movies
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
queryConfig:
  columns:
    externalRating: 'ratingsImdb'
    internalRating: 'ratingsDme'
    priority: true
    status: true
  filterType: 'Abandoned'
  folder: 'Database/Movie'
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