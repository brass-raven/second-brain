---
aliases:
  - Books To Read
class: View
from:
  - "[[View/Note/Book|Book]]"
order:
queryConfig:
  columns:
    externalRating: ratingsGoodreads
    internalRating: rating
    priority: true
    status: true
  filterType: To Do
  folder: Database/Book
  page:
    size: 25
---
# Notes

```dataviewjs
await dv.view('task-table');
```
