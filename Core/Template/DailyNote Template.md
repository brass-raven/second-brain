---
aliases:
class: DailyNote
dueOn: <% tp.user.getDailyNote(tp.file.title, 0) %>
finishedOn:
next: <% tp.user.getDailyNote(tp.file.title, 1) %>
prior: <% tp.user.getDailyNote(tp.file.title, -1) %>
rating:
startedOn: <% tp.user.getDailyNote(tp.file.title, 0) %>
status: "[[Core/Meta/Status/Basic/In Progress|In Progress]]"
tags:
---
# Notes

# Quote

<% tp.web.daily_quote() %>

# Tasks

- [ ] Exercise.
- [ ] Drink water 1.
- [ ] Drink water 2.
- [ ] Learn something new.
