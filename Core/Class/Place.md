---
limit: 100
mapWithTag: false
icon: map-pin
tagNames: 
excludes: 
extends: Base
version: "2.1"
fields:
  - id: WKGW6o
    command:
      id: insert__presetField__address
      icon: list-plus
      label: Insert address field
    name: address
    options: {}
    type: Input
    path: ""
  - id: IpbhzV
    name: parking
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/Place"');
    type: MultiFile
    path: ""
  - id: qjIjKJ
    name: type
    options:
      customRendering: page.file.name
      customSorting: a.stat.ctime - b.stat.ctime
      dvQueryString: dv.pages('"Core/Meta/Type/Place"');
    type: File
    path: ""
  - id: faAdjM
    name: url
    options: {}
    type: Input
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - WKGW6o
  - IpbhzV
  - qjIjKJ
  - faAdjM
---
