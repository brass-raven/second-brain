---
limit: 100
mapWithTag: false
icon: user
tagNames: 
excludes: 
extends: Base
version: "2.1"
fields:
  - id: 1Kqnn1
    name: contact
    options: {}
    type: Input
    path: ""
  - id: kSzwPL
    name: importantDates
    options: {}
    type: Input
    path: ""
  - id: YjyaXX
    name: race
    options: {}
    type: Input
    path: ""
  - id: DwFW3q
    name: raceBreed
    options: {}
    type: Input
    path: ""
  - id: ma2TwN
    name: relationshipChildren
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character"')
    type: MultiFile
    path: ""
  - id: 4Skdu9
    name: relationshipFriend
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character"')
    type: MultiFile
    path: ""
  - id: G7IG2m
    name: relationshipParent
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character"')
    type: MultiFile
    path: ""
  - id: 3oNysq
    name: relationshipPartner
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
      dvQueryString: dv.pages('"Database/Character"')
    type: MultiFile
    path: ""
  - id: 2LsGlD
    name: relationshipSibling
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
  - 1Kqnn1
  - kSzwPL
  - YjyaXX
  - DwFW3q
  - ma2TwN
  - 4Skdu9
  - G7IG2m
  - 3oNysq
  - 2LsGlD
---
