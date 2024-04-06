---
limit: 100
mapWithTag: false
icon: book-copy
tagNames: 
excludes: 
extends: BaseWebTask
version: "2.1"
fields:
  - id: JVy7EM
    name: author
    options:
      dvQueryString: dv.pages('"Database/Author"')
      customRendering: page.aliases?.[0] ?? page.file.name
    type: MultiFile
    path: ""
  - id: NddInH
    name: bookCount
    options: {}
    type: Number
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - JVy7EM
  - NddInH
---
