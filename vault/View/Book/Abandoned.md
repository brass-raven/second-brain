---
aliases:
  - Abandoned Books
class: View
from:
  - "[[View/Note/Book|Book]]"
order: 
queryConfig:
  columns:
    externalRating: ratingsGoodreads
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/Book
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
