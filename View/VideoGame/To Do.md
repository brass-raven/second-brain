---
aliases:
  - Video Games To Play
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
queryConfig:
  columns:
    externalRating: 'ratingsIgdb'
    internalRating: 'ratingsDme'
    priority: true
    status: true
  filterType: 'To Do'
  folder: 'Database/VideoGame'
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
