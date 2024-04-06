---
aliases:
  - Top Dialogs
  - Top Quotes
class: View
from:
  - "[[View/Note/Book|Book]]"
order:
queryConfig:
  columns:
    internalRating: ratingsDme
  filterType: Top
  folder: Database/Dialog
  limit: 100
---
# Notes

```dataview
TABLE WITHOUT ID
    file.link as "Name",
    join(speakers, ","),
    ratingsDme
FROM "Database/Dialog"
SORT
    ratingsDme DESC
```
