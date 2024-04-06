---
limit: 100
mapWithTag: false
icon: quote
tagNames: 
excludes: 
extends: Base
version: "2.1"
fields:
  - id: anSUQY
    name: speakers
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character"')
    type: MultiFile
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - anSUQY
---
