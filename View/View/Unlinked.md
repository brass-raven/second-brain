---
aliases:
  - Unlinked Views
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
---
```dataview
TABLE
  file.path
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
