# How to keep the old DataBase
This is a guide on what to do to keep using the old database and also to inform the users why the new update requires users to loose their data.

## Table of Contents
1. [Reason for this](#why-i-have-to-delete-my-db-and-lose-all-my-data)
2. [Use old Package](#how-to-use-old-forgedb)
3. [Update without data loss](#is-it-possible-to-keep-my-database-but-use-the-new-one)

### Why i have to delete my db and lose all my data?
As this change may make some people mad, this update is for the general good. First of all old ForgeDB was using Quick.DB. That package didn't provide any ways to make pre-set types so it wasn't safe for the developers to use so we had to get rid of it. Moreover, old package is using a different format which is also very unsafe to use which lead to a ton of bugs as many users noticed. The new format was written that way that there will remove all the bugs and not cause more and in addition will not force more breaking changes in future updates. Last but not least new ForgeDB gives the ability to the user to select which DataBase they will use from a variety of the most popular databases such as SQLite, mySQL and even MongoDB.

### How to use old ForgeDB
If you want to use the old ForgeDB package you can install it from github or don't update. To install it from github you will have to download `old` branch. To do that run this 
```bash
npm i github:tryforge/ForgeDB#old
```

### Is it possible to keep my DataBase but use the new one?
The answer is yes but it is not recommend as it will consume you a lot of time just to transfer your data is this process can be done only manually. To do this, before you delete `forge.db` you will have to execute this ForgeScript command. 
```
$writeFile[forge.db.json;$getDB]
```
After you run this command there should be a new file called `forge.db.json`. In that file there will be your old db records. After that you need to install the new forge.db as [how to update guide](https://github.com/tryforge/ForgeDB/blob/main/guides/how-to-update.md) shows. Then, manually, you will have to set all the records that are inside `forge.db.json` record but you will have to identify what each id goes for so you can use the right function. And that's it! You managed to update your DataBase without loosing any data even tho you wasted a ton of time!

### Thanks For Reading
Thanks for your time reading and we hope you understand the reason behind this update. <br>
This guide was written by the developer of this package, [aggelos](https://discord.com/users/637648484979441706).