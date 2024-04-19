---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Notes

This note discusses visual changes that this vault makes to the standard Obsidian look and feel.

## Extra Appearance Information

### CSS Snippets

If you [[View/Documentation/Hotkeys#^openSettings|Open Settings]], go to "Appearance", and scroll to the bottom you will see a "CSS snippets" section with the below CSS files that you can enable/disable.

#### CSS Classes Snippet

Enabled by default, the `css-classes` snippet adds the below classes that you can optionally add to your notes using the [[View/Documentation/Metadata#CSS Class Property|CSS Class Property]].

![[View/Documentation/Metadata#^cssClassPropertyExample]]

##### No Strikethrough CSS Class

Adding the `cssNoStrike` class to a note removes the strikethrough styling on text of completed check lists. If you want this behavior for your full vault instead of just a single note, enable [[#No Strikethrough Snippet]].

#### Embed Cleanup Snippet

Enabled by default, the `embed-cleanup` snippet removes the border and padding on the left of [[View/Documentation/Obsidian Syntax#Embed Internal File|Embed Internal Files]] when in [[View/Documentation/Hotkeys#^toggleReadingView|Reading View]].

#### No Strikethrough Snippet

Disabled by default, the `no-strikethrough` snippet removes the strikethrough styling on text of completed check lists. If you want this behavior for a single note instead of your full vault, use [[#No Strikethrough CSS Class]].
