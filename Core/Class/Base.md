---
limit: 100
mapWithTag: false
icon: help
tagNames: 
excludes: 
extends: 
version: "2.5"
fields:
  - id: 0jZ22Y
    name: class
    options:
      valuesList: {}
      sourceType: ValuesFromDVQuery
      valuesListNotePath: ""
      valuesFromDVQuery: |-
        dv.pages('"Core/Class"').map((page) => {
          return page.file.name;
        }).filter((className) => {
          return !className.startsWith('Base');
        });
    type: Select
    path: ""
  - id: nnjC3t
    name: from
    options:
      customRendering: page.aliases?.[0] ?? page.file.name
    type: MultiFile
    path: ""
  - id: RKPYAe
    name: ratingsDme
    options:
      min: "0"
      max: "100"
    type: Number
    path: ""
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - 0jZ22Y
  - nnjC3t
  - RKPYAe
---
