---
aliases:
  - Top Articles
class: View
from:
  - "[[View/Note/Article|Article]]"
order:
queryConfig:
  columns:
    externalRating: ratingsGoodreads
    internalRating: rating
  filterType: Top
  folder: Database/Article
  page:
    size: 100
---
# Notes

```dataviewjs
await dv.view('task-table');
```
