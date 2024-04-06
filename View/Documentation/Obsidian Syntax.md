---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Notes

Most of the below information was stolen from various steps of [Obsidian's syntax guide](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax).

You can find all of the below information and more by [[View/Documentation/Hotkeys#^openCommandPalette|opening command palette]] and selecting "Open sandbox vault". The below information is used for [[View/Documentation/Quickstart|Quickstart documentation]] and to quickly see examples of different elements.

The [Obsidian Rocks](https://obsidian.rocks) site is also a cool spot to find ideas about how you can use Obsidian.

# Essential Syntax

## Heading

[Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Quotes).

Headers are larger, display in the table of contents for the given note, and are [[#Link To A Header|easy to link to]]. I recommend leaving a new line before and after each heading in your document to give the content under the heading space.

You can start a line with `#` to make a header and add additional `#` after the first one to make sub-headers (up to 6 layers deep).

> [!example]-
> ##### Syntax
> ```md
> # Level 1 Header
> ## Level 2 Header
> ### Level 3 Header
> #### Level 4 Header
> ##### Level 5 Header
> ###### Level 6 Header
> ```
> > [!info] Output
> > # Level 1 Header
> > ## Level 2 Header
> > ### Level 3 Header
> > #### Level 4 Header
> > ##### Level 5 Header
> > ###### Level 6 Header

## Internal Link

[Official documentation](https://help.obsidian.md/Linking+notes+and+files/Internal+links).

Internal links are how you tie your notes together. This includes linking a file to different parts of itself, so it is important to know how to link to various parts of documents.

Links can also be previewed by holding `Command` and hovering over them.

### Link Alias

Links can be given another name by adding a `|` character after the link identifier followed by the alias to display. If you find yourself regularly referring to a given note by an alias, then it might make sense to use the [[View/Documentation/Metadata#Aliases Property|aliases property]].

> [!example]-
> ##### Syntax
> ```md
> [[Core/Template/DailyNote Template|Alias Name]]
> ```
> > [!info] Output
> > [[Core/Template/DailyNote Template|Alias Name]]

### Link To Another Note

The below example shows you how to link to the `DailyNote Template` note in the `Core/Template` folder of your vault.

> [!example]-
> ##### Syntax
> ```md
> [[Core/Template/DailyNote Template]]
> ```
> > [!info] Output
> > [[Core/Template/DailyNote Template]]

You can combine this method with other internal linking methods like [[#Link To A Header]] to link to specific spots within another note.

> [!example]-
> ##### Syntax
> ```md
> [[Core/Template/DailyNote Template#Notes]]
> ```
> > [!info] Output
> > [[Core/Template/DailyNote Template#Notes]]

### Link To A Block

Every element in your notes is considered a block. Blocks can be tagged using a `^` followed by a unique name, then you can link to them using `#^` followed by the unique name.

This below code is needed for the inner examples.

* Item 1. ^listItemId
* Item 2.
* Item 3.

^listId

#### Link To List

Note that to link to a full list block you need to have a newline between the list and the tag or you will link to the last item in the list instead.

> [!example]-
> ##### Syntax
> ```md
> * Item 1.
> * Item 2.
> * Item 3.
>
> ^listId
> [[#^listId]]
> ```
> > [!info] Output
> > [[#^listId]]

#### Link To List Item

> [!example]-
> ##### Syntax
> ```md
> * Item 1. ^listItemId
> * Item 2.
> * Item 3.
> [[#^listItemId]]
> ```
> > [!info] Output
> > [[#^listItemId]]

### Link To A Header

You can link directly to a [[#Heading]] in the current note or a different note in the vault.

> [!example]-
> ##### Syntax
> ```md
> [[#Heading]]
> ```
> > [!info] Output
> > [[#Heading]]

You can link to a heading under another heading by directly linking to it, or by specifying the parent header first. Adding the parent header can be useful if there are other headers with the same name as the child header you are linking to.

> [!example]-
> ##### Syntax
> ```md
> [[#Essential Syntax#Heading]]
> ```
> > [!info] Output
> > [[#Essential Syntax#Heading]]

## Embed Files

[Official documentation](https://help.obsidian.md/Linking+notes+and+files/Embed+files).

### Embed Internal File

You can embed notes or parts of notes elsewhere in the same note or in another note by adding a `!` in front of an [[#internal link]].

> [!example]-
> ##### Syntax
> ```md
> ![[#^listId]]
> ```
> > [!info] Output
> > ![[#^listId]]

### Embed Internal Image

Images (from the [[View/Documentation/Folders Asset|Asset Folder]]), & [[View/Documentation/Plugins Excalidraw|excalidraw pictures]] (from the [[View/Documentation/Folders Excalidraw|Excalidraw Folder]]) can also be embedded and you can use `{width}x{height}` as the alias to resize the image.

> [!example]-
> ##### Syntax
> ```md
> ![[View/Documentation/Assets/Obsidian Layout|400x200]]
> ```
> > [!info] Output
> > ![[View/Documentation/Asset/Obsidian Layout|400x200]]

### Embed External Image

You can also embed external images using the [[#External Link|external link]] syntax with a `!` in front of it.

> [!example]-
> ##### Syntax
> ```md
> ![Butter bot|150x200](https://static.wikia.nocookie.net/rickandmorty/images/6/67/Butter_Robot_Picture.png/revision/latest?cb=20171106225602)
> ```
> > [!info] Output
> > ![Butter bot|150x200](https://static.wikia.nocookie.net/rickandmorty/images/6/67/Butter_Robot_Picture.png/revision/latest?cb=20171106225602)

## External Link

[Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20links)

External links can send you to any URL.

> [!example]-
> ##### Syntax
> ```md
> [Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20links)
> ```
> > [!info] Output
> > [Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20links)

## Text

[Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Bold,%20italics,%20highlights).

You can add basic styling to text to make it stand out more or less.

> [!note] See [[#Code Inline]] & [[#Code Block]] for more examples of formatting text.

> [!example]-
> ##### Syntax
> ```md
> **Bold**
> _Italic_
> **_Bold & Italic_**
> ~~Strikethrough~~
> ==Highlight==
> ```
> > [!info] Output
> > **Bold**
> > _Italic_
> > **_Bold & Italic_**
> > ~~Strikethrough~~
> > ==Highlight==
# Extra Syntax

## Callout

[Official documentation](https://help.obsidian.md/Editing+and+formatting/Callouts).

Callouts are a good way to add emphasis to some content. If you want something slightly less flashy, the [[#Quote|quote]] might be a good option.

### Basic

Callouts are very similar to [[#Quote|quotes]], but they have an added `[!type]` (see available [[#Callout#Types|callout types]]) on their first line.

> [!example]-
> ##### Syntax
> ```md
> > [!example] This text is emphasised.
> ```
> > [!info] Output
> > > [!example] This text is emphasised.

### Content

Callouts can have a title on their first line and content on the following quoted lines.

> [!example]-
> ##### Syntax
> ```md
> > [!example] Header for content.
> > Emphasised content.
> ```
> > [!info] Output
> > > [!example] Header for content.
> > > Emphasised content.

### Collapsable

Adding a `-` after the type makes the callout content collapsable.

> [!example]-
> ##### Syntax
> ```md
> > [!example]-
> > Collapsable area.
> ```
> > [!info] Output
> > > [!example]-
> > > Collapsable area.

### Nested

Callouts can be nested inside of other callouts.

> [!example]-
> ##### Syntax
> ```md
> > [!example] Outer Title
> > Outer content.
> > > [!tip] Inner Title
> > > Inner content.
> >
> > More outer content.
> ```
> > [!info] Output
> > > [!example] Outer Title
> > > Outer content.
> > > > [!tip] Inner Title
> > > > Inner content.
> > >
> > > More outer content.

### Types

Below is a list of every type of callout. It is not nested in an example because that would mess with their colors.

> [!abstract] Abstract Callout

> [!bug] Bug Callout

> [!danger] Danger Callout

> [!example] Example Callout

> [!failure] Failure Callout

> [!info] Informational Callout

> [!note] Note Callout

> [!success] Success Callout

> [!tip] Tip Callout

> [!todo] To do Callout

> [!question] Question Callout

> [!quote] Quote Callout

> [!warning] Warning Callout

## Code Block

[Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Code%20blocks).

Code blocks let you have example code with syntax highlighting. You start them with ` ```{language} ` where `language` is the syntax highlighting you want and end them with ` ``` `. They are also used for the [[View/Documentation/Plugins Dataview|Dataview Plugin]] using special languages.

> [!note] See [[#Code Inline]] for more examples of displaying code.

> [!note] If you need to add ` ``` ` inside of a code block, then you can add extra backticks to the outer code block (I learned this while creating the below example).

> [!example]
> ##### Syntax
> ````md
> ```ts
> const meaningOfLife: number = 42;
> ```
> ````
> > [!info] Output
> > ```ts
> > const meaningOfLife: number = 42;
> > ```

## Code Inline

[Official documentation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Inline%20code).

Inline code blocks let you emphasis text. They are also used for the [[View/Documentation/Plugins Dataview|Dataview Plugin]] when doing [[View/Documentation/Plugins Dataview#Inline Query|inline queries]].

> [!note] See [[#Code Inline]] for more examples of displaying code.

> [!note] If you need to add `` ` `` inside of inline code, then you can add extra backticks to the outer inline code. You also need to add spaces to the beginning and end of the code if you want to start or end your block with the character.

> [!example]-
> ##### Syntax
> ```md
> `Inline Code`
> ```
> > [!info] Output
> > `Inline Code`

## Quote

[Official documenation](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Quotes).

Quote blocks allow you so add emphasis to a section of the document. If you want something more flashy, the [[#Callout|callout]] might be a good option.

> [!example]-
> ##### Syntax
> ```md
> > Hello World!
> > **_~ Some Programmer_**
> ```
> > [!info] Output
> > > Hello World!
> > > **_~ Some Programmer_**
