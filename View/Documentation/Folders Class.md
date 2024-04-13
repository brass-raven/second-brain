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

* The [[#Character|Character class]] is not called human/person because I wanted it to encapsulate pets and characters with weird races in media.
* The [[#Dialog|Dialog class]] is not called quote because I wanted it to encapsulate back & forth exchanges between two or more [[#Character|Characters]].
* The [[#Term|Term class]] is not called word because I wanted it to encapsulate multi-word phrases.

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

The [[Core/Class/View|View]] class (extends [[#Base]]) is used for general notes that do not fall under one of the other classes and should be stored in the [[View/Documentation/Folders View|View Folder]] .

In addition to storing general notes they are used to interlink and/or query other notes throughout the vault.

#### Query View

Query views are where I place my [[View/Documentation/Plugins Dataview|Dataview Plugin]] queries.

When I query notes for a specific class I place it in the [[View/Documentation/Folders View|View Folder]] under a subfolder named after the class I am querying.

> [!example]-
> You could create a `To Do` note under the `Book` subfolder of the [[View/Documentation/Folders View|View Folder]] to track the books you have yet to finish. In fact, the [[View/Book/To Do|Books To Read]] view is already made for you.

When I made a more general query that selects data across multiple classes, I put it under the [[View/Documentation/Folders View Notes|View Notes Folder]] with my [[#General View]] notes.

#### General View

General view notes can be created in the [[View/Documentation/Folders View Notes|View Notes Folder]] using the [[View/Documentation/Hotkeys#^addNew|add new hotkey]], then selecting "View".

They are the same as [[#Parent View]] notes, but their template does not have the subviews section since not all views have collections of views under them.

> [!example]-
> I added a `View/Note/Acronyms` note to contain a table of acronyms and what they stand for.

#### Parent View

Parent view notes can be created in the [[View/Documentation/Folders View Notes|View Notes Folder]] using the [[View/Documentation/Hotkeys#^addNew|add new hotkey]], then selecting "Parent View".

They are the same as [[#General View]] notes, but their template has a subviews section that will automatically display view notes that have the current note in their [[View/Documentation/Metadata#From Property|from]] property.

> [!example]-
> You could create a view for each subject you want to learn about and link them all back to a `Learning` view to access them all from one place.
>
> When a subject view gets too large, split it up into multiple views that you reference from the original subject view.

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
