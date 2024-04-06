---
class: View
from:
  - "[[View/Note/Home|Home]]"
order:
---
# Notes

# Subviews

```dataview
TABLE
FROM "Database/DailyNote"
WHERE
  contains(tags, "journal")
SORT
  file.name DESC
```
