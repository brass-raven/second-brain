---
aliases:
  - Video Games To Play
class: View
from:
  - "[[View/Note/VideoGame|VideoGame]]"
order: 
queryConfig:
  columns:
    externalRating: ratingsIgdb
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: To Do
  folder: Database/VideoGame
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
