---
aliases:
  - Abandoned Movies
class: View
from:
  - "[[View/Note/Movie & Show|Movie & Show]]"
order: 
queryConfig:
  columns:
    externalRating: ratingsImdb
    internalRating: ratingsDme
    priority: true
    status: true
  filterType: Abandoned
  folder: Database/Movie
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
