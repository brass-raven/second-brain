---
class: View
from:
  - "[[View/Documentation/README|README]]"
order:
---
# Notes

In general you should always look at the [[View/Documentation/Release Notes|Release Notes]] for the specific version you are upgrading to because they sometimes contain specific upgrade instructions.

With that said, you will always need to [[#Copy Files]] which is often the first step of upgrading.

## Copy Files

Copying files into your vault will depend on how you get the latest release.
- If you use [git](https://git-scm.com) (highly recommended), then follow the [[#Copy Files With Git]] section
- If you downloaded a zip file, then follow the [[#Copy Files Manually]] section.

### Copy Files With Git

If you are already on a git release of Second Brain then follow the below instructions. If you have been using zip files, then first follow the [[#Switch To Git Releases]] documentation.
1. Open a [git](https://git-scm.com) capable terminal.
2. Change directories to the repository directory which should be one directory up from this vault and is usually named `second-brain`.
3. Run a `git pull` and resolve any git conflicts that come up.
    - Note: Conflicts only happen if you modify the same file that a release also modifies.

### Copy Files Manually

If you have been using the zip file releases of Second Brain, then it is highly recommended to [[#Switch To Git Releases]] and [[#Copy Files With Git]] instead of doing it manually since it runs less of a risk of you accidentally losing your changes.

If you prefer to manually copy files from the zipped releases the follow one of these two paths.
- If you have not made any major configuration changes, then I recommend this path.
    1. Replace the entire [[View/Documentation/Folders Core|Core Folder]].
    2. Add any missing directories to the [[View/Documentation/Folders Database|Database Folder]].
    3. Copy the contents of each subfolder of [[View/Documentation/Folders View|View Folder]] over. You should be able to copy and replace the full subfolders except for the [[View/Documentation/Folders View Notes|View Notes Folder]] which should be merged with yours.
- If you have made configuration changes you are worried about losing, then you should fine the [pull request in GitHub](https://github.com/brass-raven/second-brain/pulls?q=is%3Apr+is%3Aclosed) for the new release and copy files/changes individually.

## Switch To Git Releases

> [!warning] Repository Directory
> If you go through with the below transition your vault will go from looking like `second-brain/Database` to `second-brain/vault/Database` and you will want to open `vault` in Obsidian, not `second-brain` from now on.

If you are currently using a version of Second Brain that was distributed by downloading a zip file, then I recommend doing the following steps to connect to the [Second Brain repository](https://github.com/brass-raven/second-brain) instead.
1. Open a [git](https://git-scm.com) capable terminal.
2. Use `git clone` to pull down the [Second Brain repository](https://github.com/brass-raven/second-brain).
3. Go through the [[View/Documentation/Folders View Notes|View Notes Folder]] and subdirectories of the [[View/Documentation/Folders Database|Database Folder]] and copy all of your existing notes over to the new vault.
