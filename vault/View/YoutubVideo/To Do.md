---
aliases:
  - YouTube Videos To Watch
class: View
from:
  - "[[View/Note/YouTube|YouTube]]"
order: 
queryConfig:
  columns:
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: To Do
  folder: Database/YouTubeVideo
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
