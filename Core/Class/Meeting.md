---
fields:
  - name: attendees
    type: MultiFile
    options:
      dvQueryString: dv.pages('"Database/Character"')
      customRendering: page.aliases?.[0] ?? page.file.name
    path: ""
    id: gSM5Qb
  - name: date
    type: Date
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: true
      linkPath: Database/DailyNote/
    path: ""
    id: PB7NUB
version: "2.9"
limit: 100
mapWithTag: false
icon: users
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: Base
savedViews: []
favoriteView: 
fieldsOrder:
  - gSM5Qb
  - PB7NUB
---
