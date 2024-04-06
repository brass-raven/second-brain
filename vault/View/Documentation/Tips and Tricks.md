---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Notes

This documentation is focused on minor improvements to my workflow that I decided would be nice for people to not have to discover on their own.

# Essential Tips

* When using the [[View/Documentation/Hotkeys#^addNew|add new hotkey]] you can search the options.
    * Example: I use the hotkey, enter "yv", then hit `Enter` to create a [[View/Documentation/Folders Class#YouTubeVideo|YouTubeVideo]] note.
* Hold command when hovering over [[View/Documentation/Obsidian Syntax#Internal Link|internal links]] to see a preview.
* Hold command [[View/Documentation/Hotkeys#^openQuickSwitcher|when opening notes]] to open them in a new tab.
* When creating [[View/Documentation/Obsidian Syntax#Internal Link|internal links]] you can type `[[`, start typing the name of the note, then link directly to a [[View/Documentation/Obsidian Syntax#Link To A Header|header]] or [[View/Documentation/Obsidian Syntax#Link To A Block|block]] by typing `#` or `^` respectively.
* When creating [[View/Documentation/Obsidian Syntax#Internal Link|internal links]] you can hit `Tab` to start typing a [[View/Documentation/Obsidian Syntax#Internal Link#Link Alias|custom link alias]] or `Enter` to finish the link quickly once the correct note/header/block is displaying in the autocomplete.
* You can right click on an open tab and pin it to keep it open when you click on its links.
* If you want to delete a file, but you are not sure if anything links to it, then check its [[View/Documentation/Layout#Backlinks|backlinks]].

![[View/Documentation/Folders Class#Confusing Class Names]]

# Extra Tips

- When adding a note using a script that asks for a [[View/Documentation/Folders Meta#Status|status]] you may want to say "To Do", then manually set the status to "Done" after the note is generated to keep the scripts from automatically setting other properties (e.g. `finishedOn`) to today's date.
- If you want status to default to one of the options instead of selecting one each time, then do the following.
    - [[View/Documentation/Hotkeys#^openSettings|Open Obsidian settings]], click "QuickAdd", then click "Manage Macros"
    - Click the macro you want to default to a specific status.
    - Click the gear next to its search script at to top.
    - Select the status you want it to default to.
- I added custom CSS to Obsidian. To disable, do the following.
    - [[View/Documentation/Hotkeys#^openSettings|Open Obsidian settings]], then click "Appearance".
    - Scroll down to "CSS snippets".
    - Disable my scripts.
