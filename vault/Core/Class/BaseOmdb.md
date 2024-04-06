---
limit: 100
mapWithTag: false
icon: clipboard-list
tagNames: 
excludes: 
extends: BaseWebTask
version: "2.4"
fields:
  - id: s5wfFp
    name: cast
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/Character/Nonfiction"');
    type: MultiFile
    path: ""
  - name: characters
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/Character"')
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: A7CDNv
  - id: YG52Se
    name: cover
    options: {}
    type: File
    path: ""
  - id: g8DAir
    name: director
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Database/Character/Nonfiction"');
    type: MultiFile
    path: ""
  - id: 6LbY03
    name: genre
    options:
      customRendering: page.file.name
      dvQueryString: dv.pages('"Core/Meta/Genre"');
    type: MultiFile
    path: ""
  - id: OKk89z
    name: next
    options:
      customRendering: page.file.name
    type: File
    path: ""
  - id: tfQ6NA
    name: own
    options: {}
    type: Boolean
    path: ""
  - id: NndJjw
    name: prior
    options:
      customRendering: page.file.name
    type: File
    path: ""
  - id: e0bJxp
    name: rated
    options: {}
    type: Input
    path: ""
  - id: rSYogl
    name: ratingsImdb
    options:
      min: "0"
      max: "100"
    type: Number
    path: ""
  - id: 0fznpk
    name: runtime
    options: {}
    type: Input
    path: ""
  - id: 2dzvhh
    name: watchWith
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character/Nonfiction"');
    type: MultiFile
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - s5wfFp
  - A7CDNv
  - YG52Se
  - g8DAir
  - 6LbY03
  - OKk89z
  - tfQ6NA
  - NndJjw
  - e0bJxp
  - rSYogl
  - 0fznpk
  - 2dzvhh
---
