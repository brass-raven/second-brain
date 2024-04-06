---
aliases:
  - Abandoned Articles
class: View
from:
  - "[[View/Note/Article|Article]]"
order: 
queryConfig:
  columns:
    internalRating: rating
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/Article
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
