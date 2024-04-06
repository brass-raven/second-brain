---
aliases:
  - Shows To Watch
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
  filterType: 'To Do'
  folder: 'Database/Show'
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
