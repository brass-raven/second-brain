---
aliases:
  - Upcoming Release
class: View
from:
  - "[[View/Documentation/Release Notes|Release Notes]]"
order:
---
# Notes

Developed: [[Database/DailyNote/2024-04-12|2024-04-12]] - ????-??-??.
Prior Release: [[View/Documentation/Release Notes 1.1.2|1.1.2 The `dv.view` Release]].
Next Release: N/A.

## Summary

## Changes

- Add `View.description` and add it to the `dv.view('parent-view')`.
- Add `Meeting.next` & `Meeting.prior` to [[View/Documentation/Folders Class#Meeting|Meeting]].
- Turn Vim mode off by default and add [[View/Documentation/Tips and Tricks#^enableVim|documentation to enable Vim mode]].
- Only show existing files in the [[View/Documentation/Hotkeys#^openQuickSwitcher|quick switcher]]. If you would like to undo this change, then follow the [[View/Documentation/Tips and Tricks#^displayMissingNotesInQuickSwitcher|documentation to display missing notes in quick switcher]].
- Add [[View/Documentation/Plugins Relative Line Number|Relative Line Number Plugin]] for those that want to use Vim.
- Fix error thrown when adding [[View/Documentation/Folders Class#YouTubeChannel|YouTubeChannel]] with missing banner images.
- Change the toolbar on mobile to be more helpful.
- Add documentation about the [[View/Documentation/Folders Class#Meeting|Meeting]] class.
- Add release notes for older versions.
    - [[View/Documentation/Release Notes 1.0.0|1.0.0 Initial Release]].
    - [[View/Documentation/Release Notes 1.1.0|1.1.0 Meeting Release]].
- Add [[View/Documentation/Appearance|Appearance]] documentation.
- Add [[View/Documentation/Appearance#CSS Classes Snippet|CSS Classes Snippet]].
    - Add [[View/Documentation/Appearance#No Strikethrough CSS Class|No Strikethrough CSS Class]].
- Add [[View/Documentation/Appearance#No Strikethrough Snippet|No Strikethrough Snippet]].
- Fix bug where [[View/Documentation/Folders Class#BookSeries|BookSeries]] was not getting the correct file names for [[View/Documentation/Folders Class#Book|Books]].
- Add supported languages to [[View/Documentation/Obsidian Syntax#Code Block|Code Block Syntax]] documentation.

## Upgrading

![[View/Documentation/Upgrading Versions#Copy Files]]
