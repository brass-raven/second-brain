---
aliases:
  - Tasks To Do
class: View
from:
  - "[[View/Note/Task|Task]]"
order: 
queryConfig:
  columns:
    dueOn: true
    priority: true
    status: true
  filterType: To Do
  folder: Database/Task
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
