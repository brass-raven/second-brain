---
limit: 100
mapWithTag: false
icon: book-up
tagNames: 
excludes: 
extends: Base
version: "2.1"
fields:
  - id: JDZirC
    name: cover
    options:
      dvQueryString: "\n"
    type: File
    path: ""
  - id: 3dsMCt
    name: series
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/BookSeries"')
    type: MultiFile
    path: ""
  - id: Lr9hoX
    name: url
    options: {}
    type: File
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - JDZirC
  - 3dsMCt
  - Lr9hoX
---
