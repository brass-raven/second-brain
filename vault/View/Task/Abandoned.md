---
aliases:
  - Abandoned Tasks
class: View
from:
  - "[[View/Note/Task|Task]]"
order: 
queryConfig:
  columns:
    dueOn: true
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/Task
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
