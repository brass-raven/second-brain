---
aliases:
class: View
from:
order:
tags:
---
# Notes

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
