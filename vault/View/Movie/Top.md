---
aliases:
  - Top Movies
class: View
from:
  - "[[View/Note/Movie & Show|Movie & Show]]"
order: 
queryConfig:
  columns:
    externalRating: ratingsImdb
    internalRating: rating
  filterType: Top
  folder: Database/Movie
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
