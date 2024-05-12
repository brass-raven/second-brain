---
aliases:
  - 1.1.2 The `dv.view` Release
  - Second Brain 1.1.2
class: View
from:
  - "[[View/Documentation/Release Notes|Release Notes]]"
order:
---
# Notes

Developed: [[Database/DailyNote/2024-04-03|2024-04-03]] - [[Database/DailyNote/2024-04-06|2024-04-06]].
Prior Release: [[View/Documentation/Release Notes 1.1.1|1.1.1 Miscellaneous Release]].
Next Release: [[View/Documentation/Release Notes 1.2.0|1.2.0 Miscellaneous Release]].

## Summary

While learning how to turn notes into charts (more on that in a future release) I stumbled upon [[View/Documentation/Plugins Dataview#Views|Dataview Plugin Views]]. Dataview Views (not to be confused with the [[View/Documentation/Folders Class#View|View Class]]) can be used to reuse the same query on multiple notes in a far more efficient way than the method I was using and they work on mobile devices!

If you want to see the specific files that were changed, the check out the [release 1.1.2 pull request](https://github.com/brass-raven/second-brain/pull/3).

## Changes

- Add [[View/Documentation/Plugins Dataview#Views|Dataview Views]].
    - Note: This change fixes the [[View/Documentation/Known Issues|Known Issue]] where views like [[View/Book/To Do|Books To Read]] would not work on mobile devices.
    - Add `subview-table` Dataview View to find all [[View/Documentation/Folders Class#View|Views]] under a [[View/Documentation/Folders Class#Parent View|Parent View]].
    - Add `task-table` Dataview View to query notes that extend [[View/Documentation/Folders Class#BaseTask|BaseTask]].
- Fill in missing [[View/Documentation/Folders View|View Folder]] subfolders for various [[View/Documentation/Folders Class|Classes]].
    - Add `Article` folder and [[View/Note/Article|Article]] parent view for [[View/Documentation/Folders Class#Article|Article]] queries.
    - Add `Author` folder (added to [[View/Note/Book|Book]] parent view) for [[View/Documentation/Folders Class#Author|Author]] queries.
    - Add `Dialog` folder and [[View/Note/Dialog|Dialog]] parent view for [[View/Documentation/Folders Class#Dialog|Dialog]] queries.
    - Add `Place` folder and [[View/Note/Place|Place]] parent view for [[View/Documentation/Folders Class#Place|Place]] queries.
    - Add `VideoGameSeries` folder (added to [[View/Note/VideoGame|VideoGame]] parent view) for [[View/Documentation/Folders Class#VideoGameSeries|VideoGameSeries]] queries.
    - Add `YouTubeChannel` folder (added to [[View/Note/YouTube|YouTube]] parent view) for [[View/Documentation/Folders Class#YouTubeChannel|YouTubeChannel]] queries.
    - Rename `Youtube` parent view to [[View/Note/YouTube|YouTube]]
    - Rename `YoutubVideo` folder to `YouTubeVideo`.
- Renamed the `ratingsDme` property of the [[View/Documentation/Folders Class#Base|Base]] class to `rating` to make it consistent across vaults.
- Renamed `Release Log` to [[View/Documentation/Release Notes|Release Notes]] and split release notes up by version into their own notes like the one you are presently reading.
- Added [[View/Documentation/Upgrading Versions|Upgrading Versions]] notes.
- Add a [[View/Documentation/Layout#Bookmarks|Bookmark]] to display a color grouped [[View/Documentation/Hotkeys#^graphView|Graph View]] with the [[View/Documentation/Folders Core|Core Folder]] notes filtered out.
- Add [[View/Note/Take Notes|Take Notes]] to [[View/Note/Home|Home]] for easier access.
- Remove `Sandbox` note.
- Improve `task-table` searches to display items if their `prior` note is [[View/Documentation/Metadata#Abandoned Tag|Abandoned]].
- Add `tags` property to [[Core/Template/Meeting Template|Meeting Template]].

## Upgrading

![[View/Documentation/Upgrading Versions#Copy Files]]

### Find & Replace

You should also run the below find and replaces across the full vault.

#### Use the `subview-table` Dataview View.

Find:
``````md
```dataview
TABLE without id
  link(
    file.link,
    default(aliases[0], file.name)
  ) as "Name"
FROM "View"
WHERE
  contains(row.from, this.file.link)
SORT
  default(order, 0) DESC,
  default(aliases[0], file.name) ASC
```
``````
Replace:
``````md
```dataviewjs
await dv.view('subview-table');
```
``````

#### Use the `task-table` Dataview View.

This step can be skipped if you chose to copy the [[View/Documentation/Folders View|View Folder]] in the prior steps.

Find:
```md
const { getTaskTable } = require(
  app.vault.adapter.basePath
  + '/Core/Script/Dataview/utilities'
);

getTaskTable({
  dataviewApi: dv,
  obsidianApi: app
}, dv.current().queryConfig);
```
Replace:
```md
await dv.view('task-table');
```
---
> [!note] The `task-table` supports pagination using a `page` object with `number` (starting with `0`) and `size` (use `-1` for all).

Find:
```md
  limit:
```
Replace:
```md
  page:
    size:
```
