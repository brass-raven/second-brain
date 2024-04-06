---
aliases:
  - Abandoned Shows
class: View
from:
  - "[[View/Note/Movie & Show|Movie & Show]]"
order:
queryConfig:
  columns:
    externalRating: ratingsImdb
    internalRating: rating
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/Show
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
