---
aliases:
class: View
from:
  - "[[View/Note/Learning|Learning]]"
order:
tags:
---
# Notes

```dataview
TABLE WITHOUT ID
  file.link as "Name"
FROM ""
WHERE
  contains(tags, "toNote")
SORT
  default(priority.order, 0) DESC,
  file.name ASC
```
