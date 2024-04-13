---
aliases:
  - Unlinked Views
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
---
# Notes

```dataview
TABLE WITHOUT ID
  file.link as "View",
  file.path as "Path"
FROM "View"
WHERE
  !row.from
  AND !contains(file.path, "/Asset/")
  AND !contains(
    [
      "View/Documentation/README.md",
      "View/Note/Home.md"
    ],
    file.path
  )
```
