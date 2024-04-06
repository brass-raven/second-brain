# Daily Note

## Due

```dataview
TABLE without id
    file.link as "Title",
    status as "Status",
    priority as "Priority"
FROM "Database"
WHERE
    dueOn != null
    AND (
        dueOn = this.file.link
        OR (
            dueOn < this.file.link
            AND status != "Done"
        )
    )
    AND file.folder != "Database/DailyNote"
```
