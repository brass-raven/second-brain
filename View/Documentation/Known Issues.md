---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Notes

- When [[View/Documentation/Hotkeys#^addNew|adding a new note]] you will get prompted for fields that it was unable to find from the API. For example, you might get a popup asking for "chapters" when adding a new [[View/Documentation/Folders Class#YouTubeVideo|YouTube video]] if it was unable to find chapters for it. Just hit enter with blank inputs until I find a better way to handle defaults in the [[View/Documentation/Plugins QuickAdd|QuickAdd Plugin]].
- When in the property modal for most files you will see the [[View/Documentation/Metadata#Class Property|class property]] twice. This is because I created my own select that filters out [[View/Documentation/Folders Class|base classes]] before [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] was updated to add their own `class` dropdown. You can remove my dropdown by opening [[Core/Class/Base|Base]] and removing the `class` property.
- When [[View/Documentation/Hotkeys#^addNew|adding a new note]] that uses [[View/Documentation/Plugins Dataview#Inline Query|inline queries]] to access [[View/Documentation/Metadata|metadata]] in the newly created note you may need to [[View/Documentation/Hotkeys#^closeTab|close]] and [[View/Documentation/Hotkeys#^reopenTab|reopen]] the tab before the query works.
- When items are added/modified in the [[View/Documentation/Plugins QuickAdd|QuickAdd Plugin]] configuration you may need to double-click the lightning bolt to refresh the item you modified.
