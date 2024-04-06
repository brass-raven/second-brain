---
aliases:
  - Top Books
class: View
from:
  - "[[View/Note/Book|Book]]"
order:
queryConfig:
  columns:
    externalRating: ratingsGoodreads
    internalRating: rating
  filterType: Top
  folder: Database/Book
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
