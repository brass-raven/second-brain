---
limit: 100
mapWithTag: false
icon: calendar-days
tagNames: 
excludes:
  - from
  - priority
extends: BaseTask
version: "2.2"
fields:
  - id: 5Vdosa
    name: next
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/DailyNote"');
    type: File
    path: ""
  - id: tFgj1H
    name: prior
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/DailyNote"');
    type: File
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - 5Vdosa
  - tFgj1H
---
