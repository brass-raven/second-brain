# Second Brain

Second Brain is a vault set up to work in the incredible note taking application [Obsidian](https://obsidian.md).

It comes with scripts that allow you to quickly and easily add notes for many types of media such as Books, Movies, & YouTube videos that will automatically populate the note with data using APIs.

Be aware that most/all of the markdown files (except this one) will look bad in GitHub because they are using Obsidian's own markdown syntax.

If you are interested in reading more about Second Brain or other Brass Raven products, please join the [discord](https://discord.gg/rcMA3M3dKZ).

## Setup

1. Install [Obsidian](https://obsidian.md).
    - You can use [brew to install Obsidian](https://formulae.brew.sh/cask/obsidian#default) if you prefer.
2. Open a [git](https://git-scm.com) capable terminal.
3. Clone the repository to where you want your notes kept.
    - I stored mine in iCloud to sync my vault between my Mac & iPhone. To do the same, do the following steps before continuing.
        1. Open the Obsidian app on your iPhone, create a new vault, check "Store in iCloud", click "Create", and close the app.
            - I think you could run the below command in Terminal on your Mac instead, but I am unable to test it since I already created my vault (let me know if it works for you).
            1. `mkdir -pv "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents"`
        2. Open Terminal on your Mac.
        3. `cd "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents"`
        4. `rm -rf second-brain`
            - Replace `second-brain` at the end if you want a different vault name.
            - Skip this step if you ran `mkdir` earlier instead of creating the vault on your iPhone.
    1. `git clone https://github.com/brass-raven/second-brain.git second-brain`
        - Replace `second-brain` at the end (but on the one in the URL) if you want a different vault name.
3. Open Obsidian.
4. Click "Open folder as vault".
5. Navigate to where you cloned the repository and open the vault.
6. The first time you open the vault you should get a message about trusting the author. If you do, then select "Trust author and enable plugins".
7. Click the pencil icon on the left side bar to enable the "Edit Workspace" and open the "Quickstart" documentation that I recommend reading before using Second Brain in Obsidian.
