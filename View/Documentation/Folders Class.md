---
aliases:
  - Class Folder
  - Classes
class: View
from:
  - "[[View/Documentation/Folders Core|Core Folder]]"
  - "[[View/Documentation/Metadata|Metadata]]"
order:
---
# Notes

> Path: `Core/Class/`

There is a file in this folder for each of the available [[#Classes|classes]].

> [!note] Icons
> When picking an icon for a class, look through [Lucide Icons](https://lucide.dev/icons/).

# Classes

It is recommended to read the [[View/Documentation/Metadata#Essential Metadata Information|essential metadata documentation]] prior to reading this page otherwise the below information might not make sense. Most of the below notes will be generated in the [[View/Documentation/Folders Database|Database Folder]] with the exception of base classes which should never be used on a note and the [[#View]] class which has its own [[View/Documentation/Folders View|View Folder]].

> [!note] Most (if not all) of the below notes should be created using the [[View/Documentation/Hotkeys#^addNew|add new note hotkey]] which will automatically use its [[View/Documentation/Folders Template|template]] and place it in the correct folder.

## Confusing Class Names

Below is a list of class names that might be different than what you expect.

* The [[#Character|Character class]] is not called `Human`/`Person` because it encapsulates pets & characters with fictional races in media like an Argonian.
* The [[#Dialog|Dialog class]] is not called `Quote` because it encapsulates back & forth exchanges between two or more [[#Character|Characters]] while a quote is generally a single statement.
* The [[#Term|Term class]] is not called `Word` because it encapsulates multi-word terms like "Graphical User Interface".

> [!note] Most of them have more than one option when you use the [[View/Documentation/Hotkeys#^addNew|add new note hotkey]] so you can use their actual name or the one that you might expect it to be named.
> For example, adding a "Word" actually adds a [[#Term]].

## Class List

### Article

The [[Core/Class/Article|Article]] class (extends [[#BaseWebTask]]) is used for web articles you read. Scripts scrape headers from URLs.

The scraping script has custom code to make headers for articles on the below sites more accurate.
- [JavaScript Weekly Issues](https://javascriptweekly.com/issues/660).
- [Wikipedia Pages](https://en.wikipedia.org/wiki/Cat).

### Author

The [[Core/Class/Author|Author]] class (extends [[#Base]]) is used to track book authors. Scripts scrape data from GoodReads URLs.

> [!note]- Properties
> - `cover`: URL profile image for the author.
> - `series`: Links to [[#BookSeries]] the author wrote.
> - `url`: URL to the author page on GoodReads.

### Base

The [[Core/Class/Base|Base]] class is extended by all other classes to give every note its properties.

> [!note]- Properties
> - `class`: [[View/Documentation/Metadata#Class Property|Class property documentation]].
> - `from`: [[View/Documentation/Metadata#From Property|From property documentation]].
> - `rating`: Number user's rating of the media the note is for from 0-100. This property sometimes gets excluded from classes, but it is kept more often than not.

### BaseOmdb

The [[Core/Class/BaseOmdb|BaseOmdb]] class (extends [[#BaseWebTask]]) is extended by [[#Movie]] & [[#Show]]. Scripts pull data from OMDB APIs.

> [!note]- Properties
> - `cast`: Links to [[#Character|Characters]] that acted as part of this media.
> - `cover`: URL to the cover art of this media.
> - `director`: Links to [[#Character|Characters]] that directed as part of this media.
> - `genre`: Links to [[View/Documentation/Folders Meta#Genre|Genres]] for this media.
> - `next`: Link to the next media in the series.
> - `own`: Boolean for if you own a copy of this media or not.
> - `prior`: Link to the prior media in the series.
> - `rated`: String motion picture rating of this media (e.g. PG-13).
> - `ratingsImdb`: Number IMDB user rating from 0-100.
> - `runtime`: String duration of the media.
> - `watchWith`: Links to [[#Character|Characters]] that you are supposed to watch the media with.

### BaseTask

The [[Core/Class/BaseTask|BaseTask]] class (extends [[#Base]]) is extended to allows you to create a note that tracks something that you would like to complete.

> [!note]- Properties
> - `dueOn`: Link to the [[#DailyNote]] when the task is due.
> - `finishedOn`: Link to the [[#DailyNote]] when the task is finished (`null` or empty until task is complete).
> - `priority`: Link to the [[View/Documentation/Folders Meta#Priority#Basic|Priority]] for how important the task is to complete relative to other tasks.
> - `startedOn`: Link to the [[#DailyNote]] when the task is started (`null` or empty until task is in progress).
> - `status`: Link to the [[View/Documentation/Folders Meta#Status#Basic|Status]] of the task.

### BaseWebTask

The [[Core/Class/BaseWebTask|BaseWebTask]] class (extends [[#BaseTask]]) is extended by classes that are tasks and are published to the internet.

> [!note]- Properties
> - `bookmark`: String containing the last episode that was watched of a given show.
> - `publishedOn`: Link to the [[#DailyNote]] when the media was published.
> - `url`: URL to the media online.

### Book

The [[Core/Class/Book|Book]] class (extends [[#BaseWebTask]]) is used to track books. Scripts scrape data from GoodReads URLs.

> [!note]- Properties
> - `author`: Link to the [[#Author]] of the book.
> - `character`: Links to [[#Character|Characters]] in the book.
> - `cover`: URL to the cover art of this book.
> - `genre`: Links to [[View/Documentation/Folders Meta#Genre|Genres]] for this book.
> - `next`: Link to the next [[#Book]] in the series.
> - `pageCount`: Number of pages in the book.
> - `prior`: Link to the prior [[#Book]] in the series.
> - `ratingsGoodreads`: Number GoodReads user rating from 0-100.
> - `series`: Link to the [[#BookSeries]] this book is in.

### BookSeries

The [[Core/Class/BookSeries|BookSeries]] class (extends [[#BaseWebTask]]) is used to track book series. Scripts scrape data from GoodReads URLs.

> [!note]- Properties
> - `author`: Link to the [[#Author]] of the series.
> - `bookCount`: Number of [[#Book|Books]] in the series.

### Character

The [[Core/Class/Character|Character]] class (extends [[#Base]]) is used to store both fictional & non-fictional characters including humans, pets, aliens, and fantasy creatures.

> [!note]- Properties
> - `contact`: [[View/Documentation/Metadata#Object Value Properties|Object]] of contact method/contact value pairs since the [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] does not play nice with objects.
> - `importantDates`:  [[View/Documentation/Metadata#Object Value Properties|Object]] of contact method/contact value pairs since the [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] does not play nice with objects.
> - `race`: String primary race (e.g. Human, Elf, Cat, etc.)
> - `raceBreed`:  String sub-race (e.g. Caucasian, Wood, Munchkin)
> - `relationshipChildren`: Links to [[#Character]] children.
> - `relationshipFriend`: Links to [[#Character]] friends.
> - `relationshipParent`: Links to [[#Character]] parents.
> - `relationshipPartner`: Links to [[#Character]] partners.
> - `relationshipSibling`: Links to [[#Character]] siblings.

### DailyNote

The [[Core/Class/DailyNote|DailyNote]] class (extends [[#BaseTask]]) is used to store notes about a given day.


> [!note]- Properties
> - `next`: Link to the [[#DailyNote]] after this one.
> - `prior`: Link to the [[#DailyNote]] before this one.

### Dialog

The [[Core/Class/Dialog|Dialog]] class (extends [[#Base]]) is used to store quotes & parts of conversations.

> [!note]- Properties
> - `speakers`: Links to the [[#Character|Characters]] speaking during the dialog.

### Meeting

The [[Core/Class/Meeting|Meeting]] class (extends [[#Base]]) is used to store information about a meeting that happened (or will happen later).

> [!note]- Properties
> - `attendees`: Links to the [[#Character|Characters]] at the meeting.
> - `date`: Link to the [[#DailyNote]] when the meeting did/will take place on.
> - `next`: Link to the [[#Meeting]] that is next in the series of meetings or was created to continue discussing the same topic.
> - `prior`: Link to the [[#Meeting]] that is prior in the series of meetings or was the origin of why this one was created.

### Movie

The [[Core/Class/Movie|Movie]] class (extends [[#BaseOmdb]]) is used to store information about a Movie. Scripts pull data from OMDB APIs.

### Note

The [[Core/Class/Note|Note]] class (extends [[#Base]]) is a generic place to write things down and link thoughts together. This has been deprecated in favor of using [[#View]].

### Place

The [[Core/Class/Place|Place]] class (extends [[#Base]]) is used to store information about both fictional & non-fictional locations.

> [!note]- Properties
> - `address`: String containing the full address of the location.
> - `parking`: Links to [[#Place|Places]] to park.
> - `type`: Link to the [[View/Documentation/Folders Meta#Type#Place|type of place]] you are taking notes for.
> - `url`:  URL for the place.

### Show

The [[Core/Class/Show|Show]] class (extends [[#BaseOmdb]]) is used to store information about a Movie. Scripts pull data from OMDB APIs.

### Task

The [[Core/Class/Task|Task]] class (extends [[#BaseTask]]) is used to store tasks that you want to complete.

### Term

The [[Core/Class/Term|Term]] class (extends [[#Base]]) is used to store information about words and sayings.

> [!note]- Properties
> - `antonym`: Links to the [[#Term|Terms]] that are antonyms.
> - `synonym`: Links to the [[#Term|Terms]] that are synonyms.

### VideoGame

The [[Core/Class/VideoGame|VideoGame]] class (extends [[#BaseWebTask]]) is used to store information about a video game. Scripts pull data from IGDB APIs.

> [!note]- Properties
> - `console`: Links to [[View/Documentation/Folders Meta#VideoGameConsole|VideoGameConsoles]] that this game was released to.
> - `cover`: URL to the cover art of this game.
> - `developer`: Links to [[View/Documentation/Folders Meta#Company|Companies]] that developed this game.
> - `engine`: Links to the [[View/Documentation/Folders Meta#VideoGameEngine|VideoGameEngines]] used to develop this game.
> - `genre`: Links to [[View/Documentation/Folders Meta#Genre|Genres]] for this game.
> - `next`: Links to next [[#VideoGame]] in the series.
> - `own`: Boolean for if you own a copy of this video game or not.
> - `prior`: Links to prior [[#VideoGame]] in the series.
> - `publisher`: Links to [[View/Documentation/Folders Meta#Company|Companies]] that published this game.
> - `ratingsIgdb`: Number IGDB user rating from 0-100.
> - `remake`: Links to [[#VideoGame|VideoGames]] that are remakes of this game.
> - `remaster`: Links to [[#VideoGame|VideoGames]] that are remastered versions of this game.
> - `runtimeInMinutes`: Number in minutes for how long the game took you to beat.
> - `series`: Links to [[#VideoGameSeries]] that this game is part of.
> - `similarGame`: Links to [[#VideoGame|VideoGames]] similar to this one.
> - `type`: Type of video game (e.g. Shooter, Adventure, etc.).

### VideoGameSeries

The [[Core/Class/VideoGameSeries|VideoGameSeries]] class (extends [[#BaseWebTask]]) is used to store information about a video game series. Scripts pull data from IGDB APIs.

### View

The [[Core/Class/View|View]] class (extends [[#Base]]) is the most versatile class used for general notes that do not fall under one of the other classes & interlinking notes. They should be stored in the [[View/Documentation/Folders View|View Folder]] , but you will generally be adding to the [[View/Documentation/Folders View Notes|View Notes Folder]] specifically unless you are adding extra queries for other classes.

> [!note]- Properties
> - `description`: Description of the note to display next to its name when displayed in a [[#Parent View]].
> - `order`: Priority number (higher numbers at the top) to determine where the note displays in a [[#Parent View]] (default: `0`). ^viewOrderProperty

#### Query View

Query views are where [[View/Documentation/Plugins Dataview|Dataview Plugin]] queries belong.

When querying notes for a specific class place it in the [[View/Documentation/Folders View|View Folder]] under a subfolder named after the class it is querying.

> [!example]-
> You could create a `To Do` note under the `Book` subfolder of the [[View/Documentation/Folders View|View Folder]] to track the books you have yet to finish. In fact, the [[View/Book/To Do|Books To Read]] view is already made for you.

When making a more general query that selects data across multiple classes, put it under the [[View/Documentation/Folders View Notes|View Notes Folder]] with your [[#General View]] & [[#Parent View]] notes.

#### General View

General view notes can be created in the [[View/Documentation/Folders View Notes|View Notes Folder]] using the [[View/Documentation/Hotkeys#^addNew|add new hotkey]], then selecting "View".

They are the same as [[#Parent View]] notes, but their template does not have the subviews section since not all views have collections of views under them.

> [!example]-
> You could create a `View/Note/Acronyms` note to contain a table of acronyms and what they stand for.

#### Parent View

Parent view notes can be created in the [[View/Documentation/Folders View Notes|View Notes Folder]] using the [[View/Documentation/Hotkeys#^addNew|add new hotkey]], then selecting "Parent View".

They are the same as [[#General View]] notes, but their template has a subviews section that will automatically display view notes that have the current note in their [[View/Documentation/Metadata#From Property|from]] property.

> [!example]-
> You could create a view for each subject you want to learn about and link them all back to a `Learning` view to access them all from one place.
>
> When a subject view gets too large, split it up into multiple views that you reference from the original subject view.

##### Using `View` In Place Of A Class

When you need to create notes for something that does not have a class yet, it is recommended to create a [[#Parent View]] for the missing class, then create a [[#General View]] note for each instance note that would usually go into the [[View/Documentation/Folders Database|Database Folder]]. If you find yourself creating a ton of entries under this parent view, it may make sense to create a new class for yourself or request for the class to be added to this vault on the [Brass Raven Discord](https://discord.gg/rcMA3M3dKZ) or the [Second Brain repository](https://github.com/brass-raven/second-brain/issues).

> [!example]-
> If you want to take notes on different plants that you want to add to your garden, you could create a "Plants" [[#Parent View]], then create a "Jalapeno" [[#General View]] note with its [[View/Documentation/Metadata#From Property|from Metadata]] pointing to the "Plants" note like the below code shows.
> ```md
> from:
>   - "[[View/Note/Plants|Plants]]"
> ```
>
> This would cause the "Jalapeno" note to show up in the "Plants" note under its "Subviews" section.

##### Subview Query

When a parent view selects other views to display under its "Subviews" section it does so by looking for views that have the parent view under its [[View/Documentation/Metadata#From Property|from Metadata]].

If you want a [[#View]] ([[#General View]] or [[#Parent View]]) to display under multiple [[#Parent View|Parent Views]], you just need to add all of them under its [[View/Documentation/Metadata#From Property|from Metadata]].

> [!example]-
> If you want a [[#View]] to display under the "Subviews" section in both the "Entertainment" & "Learning" [[#Parent View|Parent Views]], then set its [[View/Documentation/Metadata#From Property|from Metadata]] like so.
> ```md
> from:
>   - "[[View/Note/Entertainment|Entertainment]]"
>   - "[[View/Note/Learning|Learning]]"
> ```

If you use [[View/Documentation/Metadata#Aliases Property|aliases Metadata]] in [[#View|Views]] that show up in [[#Parent View|Parent Views]] you will see that they use the top alias as their display name instead of the actual note name. If you would prefer to see the note's actual name, then use that as its first alias.

> [!example]-
> If you want a [[#View]] named "Gardening" to display as "Gardening" in [[#Parent View|Parent Views]], but still have the alias "Plants", then use the following as its [[View/Documentation/Metadata#Aliases Property|aliases Metadata]].
> ```md
> aliases:
>   - Gardening
>   - Plants
> ```

If you want a [[#Parent View]] to display notes other than other [[#View|Views]], then you can change the `source` of the query to point to another folder or tag and it will pull notes from that location so long as the [[View/Documentation/Metadata#From Property|from Metadata]] is set appropriately.

> [!example]-
> If you want to pull [[#Meeting]] notes instead of [[#View]] notes, then use the following query.
> ```md
> await dv.view('subview-table', {
>   source: '"Database/Meeting"'
> });
> ```

If you want a [[#Parent View]] to display sub note names in descending order instead of ascending order, then add `nameOrder: 'desc'` to the query instead of setting [[#^viewOrderProperty|the order property on each child note]].

> [!example]-
> If you have views that are prefixed with a date and you want them to display from latest to oldest, then use the following query.
> ```md
> await dv.view('subview-table', {
>   nameOrder: 'desc'
> });
> ```

### YouTubeChannel

The [[Core/Class/YouTubeChannel|YouTubeChannel]] class (extends [[#Base]]) used to store information about a YouTube channel. Scripts pull data from YouTube APIs.

> [!note]- Properties
> - `banner`: URL to the banner image for the channel.
> - `cover`: URL to the cover art of the channel.
> - `url`: URL to the channel on YouTube.

### YouTubeVideo

The [[Core/Class/YouTubeVideo|YouTubeVideo]] class (extends [[#BaseWebTask]]) used to store information about a YouTube video. Scripts pull data from YouTube APIs and scrape data from YouTube URLs since their API does not support video chapters.

> [!note]- Properties
> - `channel`: Link to the [[#YouTubeChannel]] that created the video.
> - `cover`: URL to the cover art for the video.
