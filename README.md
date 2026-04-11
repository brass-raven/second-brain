# Second Brain

Second Brain is a vault set up to work in the incredible note taking application [Obsidian](https://obsidian.md).

It comes with scripts that allow you to quickly and easily add notes for many types of media such as Books, Movies, & YouTube videos that will automatically populate the note with data using APIs.

Be aware that most/all of the markdown files (except this one) will look bad in GitHub because they are using Obsidian's own markdown syntax.

If you are interested in reading more about Second Brain or other Brass Raven products, please join the [discord](https://discord.gg/rcMA3M3dKZ).

## Setup

1. Install [Obsidian](https://obsidian.md).
    - You can use [brew to install Obsidian](https://formulae.brew.sh/cask/obsidian#default) if you prefer.
2. Open a [git](https://git-scm.com) capable terminal.
3. Clone the repository to where you want your notes kept. I recommend starting with something like iCloud that you can sync between your laptop & phone for free, then upgrade to [Obsidian Sync](https://obsidian.md/sync) once you know you like it so you can get version history on your notes.
    - iCloud setup:
        1. Create an empty vault to add second-brain to.
            - On iOS:
                1. Open the Obsidian app.
                2. create a new vault (name it whatever you want, but remember the name for future steps).
                3. check "Store in iCloud".
                4. Click "Create" & close the app.
            - On MacOS: I think you could run the below command in Terminal on your Mac instead, but I am unable to test it since I already created my vault (let me know if it works for you so we can fix it or remove this disclaimer 😁).
                1. `mkdir -pv "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents"`
        2. Use Git to add second-brain to your vault.
            - On MacOS:
                1. Open Terminal.
                2. `cd "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents"`
                3. `rm -rf 'second-brain'` (skip this step if you created the empty vault on MacOS).
                    - Replace `second-brain` at end of this command with whatever vault name you used.
                4. `git clone https://github.com/brass-raven/second-brain.git 'second-brain'`
                    - Leave `second-brain.git` alone, but replace `second-brain` at end of this command with whatever vault name you used.
4. Open Obsidian.
5. Click "Open folder as vault".
6. Navigate to where you cloned the repository and open the vault.
7. The first time you open the vault you should get a message about trusting the author. If you do, then select "Trust author and enable plugins".
8. Click the pencil icon on the left side bar to enable the "Edit Workspace" and open [Quickstart](./View/Documentation/Quickstart.md) (warning: written for Obsidian, so the linked content will display poorly in GitHub) that I recommend reading before using Second Brain in Obsidian.

## Roadmap

I have an ongoing [list of improvements](./View/Documentation/Second%20Brain%20Improvements.md) (warning: written for Obsidian, so the linked content will display poorly in GitHub), but presently my focus is on rewriting Second Brain from the ground up for v2.0.0. Do not worry, as part of that work I am making an automatic migrator to go from older versions of Second Brain (or maybe even non-Second Brain vaults).
