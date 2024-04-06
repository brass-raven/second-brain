---
limit: 100
mapWithTag: false
icon: book
tagNames: 
excludes: 
extends: BaseWebTask
version: "2.1"
fields:
  - id: GMcdWj
    name: author
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Author"')
    type: MultiFile
    path: ""
  - id: yeiqHr
    name: character
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character"')
    type: MultiFile
    path: ""
  - id: 9Hef9w
    name: cover
    options: {}
    type: File
    path: ""
  - id: 5bTsyh
    name: genre
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Core/Meta/Genre"')
    type: MultiFile
    path: ""
  - id: 7o1Zqa
    name: next
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/Book"')
    type: File
    path: ""
  - id: IuI3GO
    name: pageCount
    options: {}
    type: Number
    path: ""
  - id: CCNI1E
    name: prior
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/Book"')
    type: File
    path: ""
  - id: 8vXTIX
    name: ratingsGoodreads
    options:
      min: "0"
      max: "100"
    type: Number
    path: ""
  - id: FIZwGR
    name: series
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/BookSeries"')
    type: MultiFile
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - GMcdWj
  - yeiqHr
  - 9Hef9w
  - 5bTsyh
  - 7o1Zqa
  - IuI3GO
  - CCNI1E
  - 8vXTIX
  - FIZwGR
---
