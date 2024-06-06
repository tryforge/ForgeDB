# Update Instructions

This guide outlines the process for updating from version 1.1.1 to version 2.0.0 and later.

## <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/156px-Warning.svg.png" alt="WarningSignImage" width="25" height="auto"> Important Notice
Please be aware that this update will result in data loss, including all stored records and cooldowns. For more information on the reasons for this and measures to prevent it, refer to the [keep old db](https://github.com/tryforge/ForgeDB/blob/main/guides/keep-old-db.md) guide.

## Update Procedure
### Step 1: Removing the Old Database Files
To proceed with the update, the existing ForgeDB files must be removed. This involves deleting the `node_modules` folder and the `forge.db` file.

### Step 2: Installing and Initializing the New Database
Install the new database by executing the following command in your terminal:
```bash
npm i @tryforge/forge.db sqlite3
```
After running this command, ForgeDB and SQLite will be installed and ready for use. No changes are required in your main file.

### Step 3: Final Adjustments
The new database is now installed and ready for use. However, note that previous functions have been replaced by new ones. Please consult our documentation and review the full changelog [here](https://docs.botforge.org/p/ForgeDB/) for details on these changes.

### Appreciation
Thank you for following this guide. Happy coding!
