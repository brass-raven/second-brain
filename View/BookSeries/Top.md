---
aliases:
  - Top Book Series
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
queryConfig:
  columns:
    internalRating: 'ratingsDme'
  filterType: 'Top'
  folder: 'Database/BookSeries'
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
