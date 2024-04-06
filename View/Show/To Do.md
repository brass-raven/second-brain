---
aliases:
  - Shows To Watch
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
  filterType: To Do
  folder: Database/Show
  page:
    size: 25
---
# Notes

```dataviewjs
await dv.view('task-table');
```
