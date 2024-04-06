---
aliases:
  - Movies To Watch
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
  filterType: To Do
  folder: Database/Movie
  limit: 25
---
# Notes

```dataviewjs
const { getTaskTable } = require(
  app.vault.adapter.basePath
  + '/Core/Script/Dataview/utilities'
);

getTaskTable({
  dataviewApi: dv,
  obsidianApi: app
}, dv.current().queryConfig);
```

# Subviews

```dataview
TABLE without id
  link(
    file.link,
    default(aliases[0], file.name)
  ) as "Name"
FROM "View"
WHERE
  contains(row.from, this.file.link)
SORT
  default(order, 0) DESC,
  default(aliases[0], file.name) ASC
```
