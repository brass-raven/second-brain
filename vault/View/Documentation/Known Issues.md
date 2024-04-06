---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Essential Issues

- You should generate your own API keys at the below locations prior to using this vault or you will not have access to some of the API keys that it relies on.
    - OMDB API Key (used for [[View/Documentation/Folders Class#Movie|Movie]] & [[View/Documentation/Folders Class#Show|Show]]).
        - Go to the [OMDB API Key](https://www.omdbapi.com/apikey.aspx) site and create an account.
        - Search your emails for "OMDB" and copy your API key out of it.
        - [[#^addApiKey|Add your API]] key to the "Lookup Movie" & "Lookup Show" macros.
    - Twitch client & secret (used by IGDB for [[View/Documentation/Folders Class#VideoGame|VideoGame]] & [[View/Documentation/Folders Class#VideoGameSeries|VideoGameSeries]]). ^twitchTokenSetup
        - Go to the [Twitch Developer Console](https://dev.twitch.tv) and log in.
        - Click the "Applications" tab in the left sidenav.
        - Click the "+ Register Your Application" button.
        - Fill the form out, below is what I used.
            - **Name**: `Second Brain`
            - **OAuth Redirect URLs**: `http://localhost`
            - **Category**: `Application Integration`
            - **Client Type**: `Confidential`
        - Click the "Create" button.
        - Click the "Manage" button next to the new client.
        - Click the "New Secret" button.
        - Use the "Client ID" and "Client Secret" to [[#^addApiKey|add your keys]] to the "Lookup VideoGame" & "Lookup VideoGameSeries" macros.
    - YouTube API Key (used for [[View/Documentation/Folders Class#YouTubeChannel|YouTubeChannel]] & [[View/Documentation/Folders Class#YouTubeVideo|YouTubeVideo]]).
        - Go to the [Google Developers Console](https://console.cloud.google.com/apis/dashboard) and log in.
        - Click the "+ ENABLE APIS AND SERVICES" button at the top of the page.
        - Search for "YouTube Data API v3" and enable it.
        - Go back to your console and select the new API at the bottom of the screen.
        - Click the "CREDENTIALS" tab.
        - Click the "SHOW KEY" button and copy your key.
        - [[#^addApiKey|Add your API]] key to the "Lookup YouTubeChannel" & "Lookup YouTubeVideo" macros.
- You should open the vault in a text editor and find `ratingsDme` and replace it with `ratings` followed by your initials (or whatever else you want).
    - Note: This could be just `rating`, but I did not want to confuse it with things like `ratingsImdb`.
- The API used to generate daily quotes in new [[View/Documentation/Folders Class#DailyNote|DailyNotes]] stops working on occasion and displays "Error generating daily quote".
- When [[View/Documentation/Hotkeys#^addNew|adding a new note]] you will get prompted for fields that it was unable to find from the API. For example, you might get a popup asking for "chapters" when adding a new [[View/Documentation/Folders Class#YouTubeVideo|YouTube video]] if it was unable to find chapters for it. Just hit enter with blank inputs until I find a better way to handle defaults in the [[View/Documentation/Plugins QuickAdd|QuickAdd Plugin]].
- When in the property modal for most files you will see the [[View/Documentation/Metadata#Class Property|class property]] twice. This is because I created my own select that filters out [[View/Documentation/Folders Class|base classes]] before [[View/Documentation/Plugins Metadata Menu|Metadata Menu Plugin]] was updated to add their own `class` dropdown. You can remove my dropdown by opening [[Core/Class/Base|Base]] and removing the `class` property.
- When [[View/Documentation/Hotkeys#^addNew|adding a new note]] that uses [[View/Documentation/Plugins Dataview#Inline Query|inline queries]] to access [[View/Documentation/Metadata|metadata]] in the newly created note you may need to [[View/Documentation/Hotkeys#^closeTab|close]] and [[View/Documentation/Hotkeys#^reopenTab|reopen]] the tab before the query works.
    - For example, when generating a [[View/Documentation/Folders Class#Movie|Move]] note you may not see the cover art until you close and reopen the note.
- When items are added/modified in the [[View/Documentation/Plugins QuickAdd|QuickAdd Plugin]] configuration you may need to double-click the lightning bolt to refresh the item you modified.

> [!tip]- Adding an API key.
> - [[View/Documentation/Hotkeys#^openSettings|Open Obsidian settings]], click "QuickAdd", and click "Manage Macros".
> - Click "Configure" under the lookup that you want to add an API key for.
> - Click the gear icon next to "search-*" script at the top.
> - Paste your API key into the "API Key" field (or other fields that the documentation suggested).

^addApiKey
