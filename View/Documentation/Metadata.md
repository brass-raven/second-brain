---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Notes

This documentation will teach you how to add extra metadata to your notes that will allow you to do cool things like filter & sort notes when using the [[View/Documentation/Plugins Dataview|Dataview Plugin]].

## Essential Metadata Information

Each note is allowed to have YAML properties (sometimes referred to as frontmatter in the official Obsidian documentation) at the top which can be used to track metadata about the note like the IMDB rating of a movie. This metadata is placed between two sets of `---` at the very top of the note. Note that if you are in [[View/Documentation/Hotkeys#^toggleReadingView|reading view]] you will see a "Properties" section at the top of the file instead of the `---` section. Instead of modifying properties using the text editor you can instead click on the icon on the right side of the tab if the note has a [[#Class Property|class]] set.

> [!example]-
> ##### Syntax
>
> This example demonstrates a note with two properties. One is a link to another note and the other is a number.
> ```md
> ---
> dueOn: "[[Database/DailyNote/2023-10-05|2023-10-05]]"
> rating: 97
> ---
> ```

### Object Value Properties

Unfortunately the [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] & Obsidian do not play nice with object values for properties. This means that they are all free-form text, so you will most likely want to set them yourself in the text instead of using the property dialog.

> [!example]-
> ##### Syntax
>
> This example demonstrates a `contact` property with two properties of its own.
> ```md
> ---
> contact:
>   cell: (231) 333 - 4444
>   email: username@site.com
> ---
> ```

### Properties on all notes

Some properties link [[#Aliases Property|aliases]] & [[#Tags Property|tags]] are built into Obsidian, other like [[#Class Property|class]] are used by plugins, and others like [[#From Property|from]] exist on the [[View/Documentation/Folders Class#Base|Base]] class to allow you to access them from anywhere.

#### Aliases Property

The `aliases` property is built into Obsidian and allows you to give a note alternative names that you can use when you [[View/Documentation/Hotkeys#^openQuickSwitcher|open the quick switcher]] and [[View/Documentation/Obsidian Syntax#Internal Link|make an internal link]].

In the below example I use the `aliases` property to make it easy to find & link to my `Two-Factor Authentication` note using its alternative name `Multi-Factor Authentication` or either of its two acronyms `2FA` or `MFA`.

> [!example]-
> ##### Syntax
> ```md
> ---
> aliases:
>   - 2FA
>   - Multi-Factor Authentication
>   - MFA
> ---
> ```

#### Class Property

There is a special `class` property built into the [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] which is used to determine which properties a note should have. See [[View/Documentation/Folders Class|Classes]] for documentation on the available classes and documentation on some of the properties they provide.

> [!note]
> Classes prefixed with `Base` are to be extended by other classes and should never be directly set on a note. ^330dac

#### CSS Class Property

The `cssclass` property is built into Obsidian and allows you to add special appearance/styling rules to a single note.

In the below example I use the `cssclass` property to make the note no longer strikethrough completed tasks so I can easily see what the checked items are. For a full list of available classes, see [[View/Documentation/Appearance#CSS Classes|CSS Classes]].

> [!example]-
> ##### Syntax
> ```md
> ---
> cssclass: cssNoStrike
> ---
> ```

^cssClassPropertyExample

#### From Property

The `from` property links to note(s) that made you create this note. This is probably the most powerful and difficult to explain/understand properties, so I am going to just give you a bunch of examples and wish you luck.

- A [[View/Documentation/Folders Class#Character|Character]] might link to the [[View/Documentation/Folders Class#Book|Book]] they are from or the [[View/Documentation/Folders Class#Character|Character]] that introduced them to you.
  - `Ash Ketchum` links to the `Pokémon` shows & video game series he is from.
  - `Henry` links to the `Kadin` & `Wyat` characters who introduced him to me.
- A [[View/Documentation/Folders Class#Term|Term]] might link to the [[View/Documentation/Folders Class#Book|Book]], [[View/Documentation/Folders Class#Character|Character]], and/or [[View/Documentation/Folders Class#YouTubeVideo|YouTubeVideo]] where you learned that term from.
  - `Anthropic` links to the `Ishmael` book I read it in.
  - `Colloquial` links to the `Kadin` character I heard it from.
- A [[View/Documentation/Folders Class#Movie|Movie]] might link to the [[View/Documentation/Folders Class#Book|Book]] that referenced it or the [[View/Documentation/Folders Class#Character|Character]] that recommended it.
  - `Army of Darkness` links to the `Forspoken - Before You Buy` YouTube video I heard about it from.
  - `Beast of Burden` links to the `Daniel Radcliffe` character I found it from.
- A [[View/Documentation/Folders Class#View|View]] might link to the parent view that caused you to look deeper into a subject.
  - `Calculus` links to the `Mathematics` view that I was learning more about.
  - `Learning` links to the `Home` view as a place to track all of my core initiatives.

#### Tags Property

The `tags` property is built into Obsidian and gives you an easy way to group notes. I have been using camel case for my tags and have listed some below that my scripts make use of.

##### Abandoned Tag

Many [[View/Documentation/Folders Class#View|views]] for notes that extend [[View/Documentation/Folders Class#BaseTask|base task]] look for a `abandoned` tag which will cause it to not show up in the "To Do" lists even if the status is not done. I use this for [[View/Documentation/Folders Class#Movie|movies]] I do not ever want to watch  and [[View/Documentation/Folders Class#VideoGame|video games]] I got bored of playing.

##### Redo Tag

Many [[View/Documentation/Folders Class#View|views]] for notes that extend [[View/Documentation/Folders Class#BaseTask|base task]] look for a `redo` tag which will cause it to show up in the "To Do" lists even if the status is done. I use this for [[View/Documentation/Folders Class#Movie|movies]] I want to rewatch  and [[View/Documentation/Folders Class#VideoGame|video games]] I want to replay.

##### To Note

Sometimes you want to write notes about something later, but do not have time right now. In those cases add a `toNote` tag, then use the [[View/Note/Take Notes|Take Notes]] [[View/Documentation/Folders Class#View|view]] to find notes with that tag to take notes on later.

## Extra Metadata Information

### Inline Properties

[Official documentation](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#inline-fields).

The [[View/Documentation/Plugins Dataview|Dataview Plugin]] also allows you to add metadata as inline fields within your note instead of the YAML at the start of the note.

> [!example]-
> This example demonstrates a note with a `rating` property set to `97`.
> ```md
> rating:: 97
> ```
