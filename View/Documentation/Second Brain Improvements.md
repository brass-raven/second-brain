---
aliases:
  - Second Brain Improvements
  - Improve Second Brain
class: View
from:
order:
tags:
---
# Notes

This page is intended to provide inspiration for future versions of [second-brain](https://github.com/Brass-raven/second-brain).

Feel free to [add an issue](https://github.com/brass-raven/second-brain/issues/new), create a merge request into this MD file to request new features, or create a merge request with the request implemented..

For historical changes, check out the [[View/Documentation/Release Notes|Release Notes]].

After making a change, please add it to [[View/Documentation/Upcoming Release|Upcoming Release]].

## To Research

- Other note taking methods. ^researchTakingNotes
    - [[Database/Term/Zettelkasten System|Zettelkasten System]].
    - Para system.
    - Ideaverse Obsidian vault.
- [Obsidian TasksPlugin](https://publish.obsidian.md/tasks/Introduction) with [TaskForge](https://taskforge.md) or something similar to get notifications for Obsidian tasks.
- [Obsidian Web Clipper](https://obsidian.md/clipper).
- [Meta Bind](https://github.com/mProjectsCode/obsidian-meta-bind-plugin) & [JS Engine plugins](https://github.com/mProjectsCode/obsidian-js-engine-plugin).

## Patch

List of fixes for issues that can be done without a [[#Major|Breaking change]].

- Convert `’` to `'` in filenames.
- Stop displaying "Buy" column when using "subview-table" with notes like [[View/Documentation/Folders Class#YouTubeVideo|YouTubeVideo]] that have a URL property.
- [[View/Documentation/Folders Class#Book|Books]].
    - Fix adding notes.
        - https://www.goodreads.com/book/show/84981.
- [[View/Documentation/Folders Class#YouTubeChannel|YouTubeChannel]].
    - Fix adding notes.
        - https://www.youtube.com/@HafuHS.
- [[View/Documentation/Folders Class#YouTubeVideo|YouTubeVideo]].
    - Fix searching videos by title instead of URL/ID.

## Minor

List of improvements/additional features that can be done without a [[#Major|Breaking change]].

- Add mobile (no computer needed) & Windows/Linux install instructions.
- Add tasks plugin / come up with a good way to track tasks, subtasks, reoccurring tasks, & mobile notifications.
- Create a config note and/or custom plugin settings that stores settings instead of having people hunt through other plugin settings (mainly [[View/Documentation/Plugins QuickAdd|QuickAdd Plugin]] for API keys).
    - Allow settings notes to extend a default settings note so users can pay attention to just their changed settings.
    - Add setting to make meeting notes default to `nameOrder: 'desc'` for provided [[View/Documentation/Plugins Dataview|Dataview Plugin]] views.
    - Support Genre mapping config (preferably support where it goes for [[View/Documentation/Folders Class#VideoGame|VideoGame]] types).
        - Convert [[View/Documentation/Folders Class#Movie|Movie]] [[Core/Meta/Genre/Sci-Fi|Sci-Fi]] to [[Core/Meta/Genre/Science Fiction|Science Fiction]] to match [[View/Documentation/Folders Class#Book|Book]].
- Styling improvements.
    - Anuppuccin theme?
    - Style Settings plugin?
- [[View/Documentation/Folders Class#Article|Article]].
    - Support for Reddit.
- Create [[View/Documentation/Folders Class#ArticleSeries|ArticleSeries]].
- [[View/Documentation/Folders Class#Base|Base]].
    - Split `Base.from` into `Base.from` (where you found out about it) & `Base.view` (views the note should display in). ^improveBase-addView
        - [[#^researchTakingNotes|Research other note taking methods]] before deciding on this route.
- [[View/Documentation/Folders Class#BaseOmdb|BaseOmdb]].
    - Add `similarTo` for similar media.
- [[View/Documentation/Folders Class#BoardGame|BoardGame]].
    - Look at `VideoGame` for inspiration about which properties to add.
- [[View/Documentation/Folders Class#Character|Character]].
    - Auto-paste from clipboard in input similar to adding other note types.
- Create [[View/Documentation/Folders Class#Company|Company]].
    - Add `contact` (same as [[View/Documentation/Folders Class#Character|Character.contact]]).
    - Add `employees` (array of [[View/Documentation/Folders Class#Character|Character]] until [[#^mapMetadata|Map Metadata]] is supported, then `Map<Character, { role: string; }>`.
    - Add `url`.
    - Hook `VideoGame.developer` & `VideoGame.publisher` up to this class.
- Create [[View/Documentation/Folders Class#General|General]].
    - [[#^researchTakingNotes|Research other note taking methods]] before deciding on this route.
    - Switch [[View/Documentation/Folders Class#View|View]] to only be views.
- [[View/Documentation/Folders Class#Meeting|Meeting]].
    - Add support for adding custom meeting templates for different series that automatically get added to the [[View/Documentation/Plugins QuickAdd|QuickAdd Plugin]] picker.
        - Stretch: Fill out prior & next fields based on others in the series.
- [[View/Documentation/Folders Class#BaseTask|BaseTask]].
    - Add "Abandoned" `status` to replace `tag`.
- [[View/Documentation/Folders Class#Book|Book]].
    - Add `similarTo` for similar media.
    - Auto-fill `Book.prior` & `Book.next` based on the series when possible.
    - Make `BookSeries.bookCount` stop including bundles.
    - Fix book titles to include book series.
        - For Example: "All These Worlds" should be "Bobiverse (Book 3) All These Worlds".
    - Autofill `finishedOn`, `startedOn`, & `status` based on Goodreads data.
- [[View/Documentation/Folders Class#Character|Character]].
    - Add `cover`.
        - Look through other types to see if it makes sense for them too.
- [[View/Documentation/Folders Class#DailyNote|DailyNote]].
    - Add [[View/Documentation/Plugins Dataview#Views|Dataview View]] to track due & past due tasks.
    - Support using different templates for the different days of the week.
- [[View/Documentation/Folders Class#Task|Task]].
    - Add `effort`.
- [[View/Documentation/Folders Class#Dialog|Dialog]].
    - Add `similarTo` for similar Dialog.
- Create [[View/Documentation/Folders Class#Food|Food]].
    - Add `DailyNote.food` multi-file select of foods this food contains.
        - Support adding the same food multiple times or "2 x Banana" style aliases for nutrition tracking.
    - Add properties & [[View/Documentation/Plugins Dataview#Views|Dataview View]] to display nutrition based on properties.
        - Default empty properties (e.g. `protein`) to the combined values on their `food`s they are created from.
- [[View/Documentation/Folders Class#Meeting|Meeting]].
    - Automatically set `Meeting.date` based on the file name if it starts with a date otherwise prefix today & use that as the date.
    - Add `Meeting.location` set to a [[View/Documentation/Folders Class#Place|Place]].
- [[View/Documentation/Folders Class#VideoGame|VideoGame]].
    - Add `characters` & try filling them in using the API.
        - Add Corrin to [[Database/VideoGame/Fire Emblem Fates Special Edition (2016)|Fire Emblem Fates Special Edition (2016)]] & [[Database/VideoGame/Super Smash Bros. Ultimate (2018)|Super Smash Bros. Ultimate (2018)]].
    - Add `maxPlayers` & `minPlayers`.
    - Link to Steam & track `achievement` progress.
        - Example achievement script for Steam profile achievements page.
        ```js
        var getPercent = ({
          done,
          total
        }) => {
          return `${(!total) ? 100 : Math.round(1000 * done / total) / 10}%`;
        };
        [...document.querySelectorAll('._2-pQFn1G7dZ7667rrakcU3')].map((rowE) => {
            const achieventsE = rowE.querySelector('._1YRRMk6X7vrOL-02K-q1pf');
            const playTimeE = rowE.querySelector('._26nl3MClDebGDV7duYjZVn');
            const titleE = rowE.querySelector('.w6q9piMq3gT16oj_lEvpy a');
            const [done, total] = achieventsE?.innerText.split('/').map((x) => parseInt(x)) ?? [0, 0];
            const game = {
                done,
                playTime: playTimeE?.childNodes[1]?.textContent ?? '',
                remaining: total - done,
                title: titleE.innerText,
                total
            };
            return { ...game, percent: getPercent(game) };
        }).filter(({ playTime, total }) => {
            return (
                !!playTime
                && (
                    parseFloat(playTime) > 5
                    || !playTime.endsWith(' minutes')
                )
                && total > 0
            );
        }).sort((gameA, gameB) => {
            return gameB.remaining - gameA.remaining;
        }).reduce((sum, { done, total }) => {
            sum.done += done;
            sum.total += total;
            sum.percent = getPercent(sum);
            return sum;
        }, { done: 0, total: 0, percent: null }).percent;
        ```
- [[View/Documentation/Folders Class#View|View]].
    - Auto-paste from clipboard in input similar to adding other note types.
    - Add `order` property to `subview-table` [[View/Documentation/Plugins Dataview|Dataview Plugin]] view as an alias for `nameOrder`.
    - Add `base` [[View/Documentation/Plugins Dataview|Dataview Plugin]] view as an improved version of `subview-table` that does all it does & more, lets the user decide the filter & makes sane defaults to columns based on note type, then lets the user add/remove columns. ^improveView-addBaseView
        - Stretch: Search through vault for instances of ` ```dataview ` that are not using one of the default views & make sure it handles those instances.
        - Handle things like `cover` & `url` (buy or link depending on class type) correctly.
        - Support at least some [GraphQL query operators](https://www.mongodb.com/docs/manual/reference/operator/query) (or something similar), so things like a "Rom-Com" genre can be created using the following. Ideally support finding by path & ignoring aliases.
        ```
        where: {
          genre: { $all: ['"[[Core/Meta/Genre/Comedy|Comedy]]"', '"[[Core/Meta/Genre/Romance|Romance]]"'] }
        }
        ```
    - Add `from` [[View/Documentation/Plugins Dataview|Dataview Plugin]] view based on [[#^improveView-addBaseView|`base` view]] with default filtering by the `from` property. ^improveView-addFromView
        - Depends on: [[#^improveView-addBaseView|`base` view]].
    - Add `view` [[View/Documentation/Plugins Dataview|Dataview Plugin]] view based on [[#^improveView-addBaseView|`base` view]] with default filtering by the `view` property. ^improveView-addViewView
        - Depends on: [[#^improveView-addBaseView|`base` view]] & [[#^improveBase-addView|add `view` property]].
    - Deprecate `subview-table` [[View/Documentation/Plugins Dataview|Plugins Dataview]] view in favor of using `from` or `view`.
        - Depends on: [[#^improveView-addFromView|`from` view]] & [[#^improveView-addViewView|`view` view]].
        - Provide a [[View/Note/Regular Expression Syntax|RegEx]] to find `subview-table` & replace with `from`.
- Create [[View/Documentation/Folders Class#YouTubePlaylist|YouTubePlaylist]].
    - https://www.youtube.com/playlist?list=PLqq4LnWs3olVtd-fSbmz8a0KhoBCB8JW4
- [[View/Documentation/Folders Class#YouTubeVideo|YouTubeVideo]].
    - Add `next` & `prior` properties.
    - Add shorts support.
        - https://youtube.com/shorts/rxRT7cL19bA.
- Add timeframe notes to group [[View/Documentation/Folders Class#DailyNote|DailyNotes]].
    - Create [[View/Documentation/Folders Class#WeeklyNote|WeeklyNote]] class (icon: calendar-minus-2).
    - Create [[View/Documentation/Folders Class#MonthlyNote|MonthlyNote]] class (icon: calendar).
    - Create [[View/Documentation/Folders Class#QuarterlyNote|QuarterlyNote]] class (icon: calendar-range).
    - Create [[View/Documentation/Folders Class#YearlyNote|YearlyNote]] class (icon: calendar-check).
- Add music feature with API to pull data from.
    - Create [[View/Documentation/Folders Class#Album|Album]].
    - Create [[View/Documentation/Folders Class#MusicArtist|MusicArtist]].
    - Create [[View/Documentation/Folders Class#Song|Song]].
- Add workout feature.
    - Create [[View/Documentation/Folders Class#Exercise|Exercise]].
    - Create [[View/Documentation/Folders Class#ExerciseRoutine|ExerciseRoutine]].
        - Make it easy for users to create exercise routine templates with various exercises preloaded on them.

## Major

Fixes or improvements that would require second brain to break the way something currently works or remove a current feature to do.

- Rename date fields on other classes to match `VideoGame.releaseDate`.
- Remove [[View/Documentation/Plugins Excalidraw|Excalidraw Plugin]].
- Use [Obsidian Bases](https://help.obsidian.md/bases) (this should replace [[View/Documentation/Plugins Dataview|Dataview Plugin]] to some degree).
- Use or create a migration plugin.
    -  Upgrade from one version 1.x to 2.0.0.
    -  Upgrade from version 2.0.0 to latest.
    - Combine second brain vaults.
    - Merge non-second brain vaults into Second Brain.
- Remove `@deprecated` TypeScript items.
- Replace [[View/Documentation/Metadata#To Note|toNote]] tag with using an Obsidian base or Dataview view to refresh [[View/Note/To Note|To Note]] (dependsOn: [[#^^improveBase-addView|add Base.view]]).
- Rename `View/Note/VideoGame` to `View/Note/Video Games` and make similar changes to other built-in view names.
- Create a plugin and/or modify [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] to enhance modifying [[View/Documentation/Metadata|Metadata]].
    - Allow properties to be alphabetically sorted automatically.
    - Allow editing properties directly at the top of the note instead of having to open the metadata modal.
    - Add a new property value type of `Dictionary` that accepts key/value pairs. ^mapMetadata
    - Allow `string[]` to contain external links.
    ```yaml
    character:
      - "[Grinch](https://www.imdb.com/title/tt0170016/characters/nm0000120)"
    ```
    - Allow objects with predefined properties like `{ link: Link; playedBy: Link; }`.
    ```yaml
    character:
      -
        link: "[[Database/Character/Fiction/Grinch|Grinch]]"
        playedBy: "[[Database/Character/Nonfiction/Jim Carrey|Jim Carrey]]"
    ```
    - Allow `Array`, `Dictionary`, & object properties to be nested to support metadata like this.
    ```yaml
    relationships:
      siblings:
        - "[[Database/Character/Nonfiction/Jim Carrey|Jim Carrey]]"
    ```
    - Add date range metadata (default object type) & new operators like checking if a date is in a range. ^dateRange
    ```yaml
    read:
      -
        start: "[[Database/DailyNote/2020-12-10|2020-12-10]]"
        end: "[[Database/DailyNote/2021-01-03|2021-01-03]]"
      -
        start: "[[Database/DailyNote/2025-03-01|2025-03-01]]"
        end: "[[Database/DailyNote/2025-03-10|2025-03-10]]"
      -
        start: "[[Database/DailyNote/2025-04-09|2025-04-09]]"
        end: null
    ```
- Replace `finishedOn` & `startedOn` with `completedOn` using an array of the new [[#^dateRange|Date Range]] type.
- [[View/Documentation/Folders Class#Character|Character]].
    - Rename `relationshipChildren` to `relationshipChild` to match other properties.
- [[View/Documentation/Folders Class#BaseOmdb|BaseOmdb]].
    - Rename `cast` to `character` and populate it with links to characters & cast that played them.
    - Rename `plot` to match `description`.
- [[View/Documentation/Folders Class#Meeting|Meeting]].
    - Rename `Meeting` to `Event`.
    - Add `finishedOn` & `startedOn`, then remove `date`.
- [[View/Documentation/Folders Class#VideoGame|VideoGame]].
    - Rename `VideoGame.similarGame` to `similarTo` to match other classes & allow for similarity to other media types.
