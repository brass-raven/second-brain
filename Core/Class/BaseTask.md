---
limit: 100
mapWithTag: false
icon: help
tagNames: 
excludes: 
extends: Base
version: "2.2"
fields:
  - id: Y4gGV0
    name: dueOn
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: true
      linkPath: Database/DailyNote/
    type: Date
    path: ""
  - id: Ak6LjH
    name: finishedOn
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: "true"
      linkPath: Database/DailyNote/
    type: Date
    path: ""
  - id: 1Pcv7b
    name: priority
    options:
      valuesList: {}
      sourceType: ValuesFromDVQuery
      valuesListNotePath: ""
      customRendering: page.file.name
      customSorting: a.stat.ctime - b.stat.ctime
      dvQueryString: dv.pages('"Core/Meta/Priority/Basic"');
    type: File
    path: ""
  - id: AKWSLI
    name: startedOn
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: "true"
      linkPath: Database/DailyNote/
    type: Date
    path: ""
  - id: T9oBiV
    name: status
    options:
      valuesList: {}
      sourceType: ValuesFromDVQuery
      valuesListNotePath: ""
      customRendering: page.file.name
      customSorting: a.stat.ctime - b.stat.ctime
      dvQueryString: dv.pages('"Core/Meta/Status/Basic"');
    type: File
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - Y4gGV0
  - Ak6LjH
  - 1Pcv7b
  - AKWSLI
  - T9oBiV
---
