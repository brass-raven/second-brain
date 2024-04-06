---
aliases:
  - Dataview Plugin
class: View
from:
  - "[[View/Documentation/Plugins|Plugins]]"
order:
---
# Notes

[Official documentation](https://blacksmithgu.github.io/obsidian-dataview/).

Dataview is used to to query other notes and display them all in one spot. It has two syntaxes, [[#Query Language]] and [[#JavaScript Language]].

# Syntax

## Inline Query

[Official documentation](https://blacksmithgu.github.io/obsidian-dataview/queries/dql-js-inline/).

Dataview allows you to query [[View/Documentation/Metadata|Metadata]] to display it line with your notes. You do this by creating a [[View/Documentation/Obsidian Syntax#Code Inline|inline code block]] that starts with an ` =` followed by a space, then the query.

### Query Another Note

You can query other notes using the [[View/Documentation/Obsidian Syntax#Internal Link|internal link]] syntax, then access its properties off from the link.

In the below example I get the `file.mdate` property of the [[View/Documentation/Quickstart|Quickstart]] note to display when it was last modified.

> [!example]-
> ##### Syntax
> ```md
> Quickstart was last modified at `= [[View/Documentation/Quickstart]].file.mtime`, have you read it since then?
> ```
> > [!info] Output
> > Quickstart was last modified at `= [[View/Documentation/Quickstart]].file.mtime`, have you read it since then?

### Query This Note

You can query the current note using the `this` keyword just like the [[#Query Language]]. You can also use [expressions](https://blacksmithgu.github.io/obsidian-dataview/reference/expressions/) to do things like embed images stored in [[View/Documentation/Metadata|Metadata]] instead of just displaying the URL.

This [[View/Documentation/Metadata#Inline Properties|inline property]] is used for the below example.
imageUrl::https://static.wikia.nocookie.net/rickandmorty/images/6/67/Butter_Robot_Picture.png/revision/latest?cb=20171106225602

> [!example]-
> ##### Syntax
> ```md
> `= "![Cover|200](" + this.imageUrl + ")"`
> ```
> > [!info] Output
> > `= "![Cover|200](" + this.imageUrl + ")"`

## Query Language

[Official documentation](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/).

You create a query section by adding a [[View/Documentation/Obsidian Syntax#Code Block|code block]] with the language set to `dataview`. This will allow you to query your notes with syntax similar to [SQL](https://www.w3schools.com/sql/).

### Tips & Tricks

- Table without the default "File" column.
- You can access properties with keywords as names (`from` in the below example) using the `row` keyword before the property name.
- You can access properties of the current note using the `this` keyword.

```sql
TABLE without id
  file.link as Link
FROM "Database"
WHERE
  contains(row.from, this.file.link)
```

## JavaScript Language

[Official documentation](https://blacksmithgu.github.io/obsidian-dataview/api/intro/).

You create a JavaScript section by adding a [[View/Documentation/Obsidian Syntax#Code Block|code block]] with the language set to `dataviewjs`. This will allow you to query your notes with syntax similar to an [ORM](https://en.wikipedia.org/wiki/Object–relational_mapping).
