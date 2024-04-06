---
aliases:
  - Top YouTube Videos
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
queryConfig:
  columns:
    internalRating: 'ratingsDme'
  filterType: 'Top'
  folder: 'Database/YouTubeVideo'
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