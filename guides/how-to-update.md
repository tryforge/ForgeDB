# How to Update
This is a guide showing you how to update only from v1.1.1 to v2.0.0 and above

## <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/156px-Warning.svg.png" alt="WarningSignImage" width="25" height="auto"> WARNING
This update will cause data loss and you will loose all your stored records and cooldowns! If you want to learn why this is happening or what to do to prevent this head over to [keep old db](https://github.com/tryforge/ForgeDB/blob/main/guides/keep-old-db.md) guide!

## Guide 
### Step 1: Removing the old DataBase files
In order to fully update ForgeDB we need to get rid of the old ForgeDB files. To do that we need to delete `node_modules` folder and `forge.db` file

### Step 2: Installing and Initializing the new DataBase
To install the new DataBase we need to run on terminal the follwing command: 
```bash
npm i @tryforge/forge.db sqlite3
```
After we run this command, ForgeDB and SQLite have been installed and ready to be used. In your main file we don't have to change anything

### Step 3: One Last Step
The new DataBase has now been installed and is ready to be used! Though, we need to take a note that the functions that existed no longer exists but they have been replaced by new ones! You can change them in our docs site and read the full changelog [here](https://docs.botforge.org/p/ForgeDB/).

### Thanks <3
Thanks for reading and happy coding!