---
limit: 100
mapWithTag: false
icon: gamepad-2
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: BaseWebTask
savedViews: []
favoriteView: 
fieldsOrder:
  - ZJlPXP
  - RAhTgN
  - 9nZxqZ
  - HXch7u
  - 79pUGp
  - N9Q8o8
  - jYdrEF
  - PVmlRB
  - Pgw20Y
  - KJHbyw
  - eOw70z
  - YVO62C
  - 4NttWu
  - vZgocX
  - omwlLH
  - Lyrb8Z
version: "2.1"
fields:
  - name: console
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/VideoGameConsole"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: ZJlPXP
  - name: cover
    type: File
    options: {}
    path: ""
    id: RAhTgN
  - name: developer
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Core/Meta/Company"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: 9nZxqZ
  - name: engine
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Core/Meta/VideoGameEngine"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: HXch7u
  - name: genre
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Core/Meta/Genre"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: 79pUGp
  - name: next
    type: File
    options:
      dvQueryString: dv.pages('"Database/VideoGame"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: N9Q8o8
  - name: own
    type: Boolean
    options: {}
    path: ""
    id: jYdrEF
  - name: prior
    type: File
    options:
      dvQueryString: dv.pages('"Database/VideoGame"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: PVmlRB
  - name: publisher
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Core/Meta/Company"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: Pgw20Y
  - name: ratingsIgdb
    type: Number
    options:
      step: 1
      min: 0
      max: 100
    path: ""
    id: KJHbyw
  - name: remake
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/VideoGame"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: eOw70z
  - name: remaster
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/VideoGame"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: YVO62C
  - name: runtimeInMinutes
    type: Number
    options:
      min: 0
    path: ""
    id: 4NttWu
  - name: series
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/VideoGameSeries"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: vZgocX
  - name: similarGame
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/VideoGame"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: omwlLH
  - name: type
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Core/Meta/Type/VideoGame"');
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: Lyrb8Z
---
