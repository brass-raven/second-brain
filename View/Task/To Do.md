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
  page:
    size: 25
---
# Notes

```dataviewjs
await dv.view('task-table');
```
