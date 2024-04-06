---
aliases:
  - Abandoned Video Games
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
  filterType: Abandoned
  folder: Database/VideoGame
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