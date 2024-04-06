---
aliases:
  - Abandoned Book Series
class: View
from:
  - "[[View/Note/Book|Book]]"
order: 
queryConfig:
  columns:
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/BookSeries
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
