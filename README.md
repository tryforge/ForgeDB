<p align="center"><img src="https://cdn.discordapp.com/emojis/1185683362334134362.png?size=1024" alt="ForgeDB logo"></p>
<h1 align="center">ForgeDB</h1>
<p align="center">An advanced DataBase extension for ForgeScript powered apps.</p>

<p align="center">
<a href="https://github.com/tryforge/ForgeDB/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeDB/main?label=@tryforge/forge.db&color=5c16d4" alt="@tryforge/forge.db"></a>
<a href="https://github.com/tryforge/ForgeScript/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4" alt="@tryforge/forgescript"></a>
<a href="https://discord.gg/hcJgjzPvqb"><img src="https://img.shields.io/discord/739934735387721768?logo=discord" alt="Discord"></a>
</p>
<h2 align="center">Contents</h2>

1. Installation
   - [Effortless installation](#effortless-installation)
   - [MongoDB installation](#mongodb-installation)
   - [Other installation](#other-installation)
   - [Android installation](#android-installation)
3. [Events](#events)
4. [Updating](https://github.com/tryforge/ForgeDB/blob/main/guides/how-to-update.md)
5. [Documentation](https://docs.botforge.org/p/ForgeDB/)
6. [Credits](#credits)
<br>

<h3 align="center">Effortless installation</h3><hr>

1. Run the following command to install the required `npm packages`:
```bash
npm i @tryforge/forge.db sqlite3
```
2. Now, in your client initialization:
```js
const { ForgeDB } = require("@tryforge/forge.db")

/* I'm assuming that the client can be an app or anything else */
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB()
    ]
})
```
Congratulations, you have successfully connected your client to a local database.

<h3 align="center">MongoDB Installation</h3><hr>

1. Run the following command to install the required `npm packages`
```bash
npm i @tryforge/forge.db mongodb
```
2. Now, in your client initialization:
```js
const { ForgeDB } = require("@tryforge/forge.db")

// I'm assuming that the client, can be an app or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB({
            type: "mongodb",
            url: "Your_MongoURI_URL"
        })
    ]
})
```
Congratulations, you have successfully connected your client to a MongoDB database

<h3 align="center">Other Installation</h3><hr>
<p align="center">Your here because you want to try other DBs. So now just follow the steps below to set up your bot to work with other DBs:</p>

1. You have to first install ForgeDB, so you just run this command in your terminal:
```bash
npm i @tryforge/forge.db
```
2. Now that you've installed ForgeDB, you'll now have to install the DB package you want to use. Here are the ones ForgeDB currently supports:
    - **Better Sqlite3**
    ```bash
    npm i better-sqlite3
    ```
    - **MySQL**
      > *MySQL have got two versions, you can use either of them.*
       - `MySQL`
         ```bash
         npm i mysql
         ```
       - `MySQL2`
         ```bash
         npm i mysql2
         ```
    - **Postgres**
    ```bash
    npm i postgres
    ```
3. Now that you have installed your preferred DB package, now you have to connect it with ForgeDB and ForgeScript:
```js
const { ForgeDB } = require("@tryforge/forge.db")

// I'm assuming that the client, can be an app or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB({
            type: ""; //You've to put the DB you want to use, available: mysql, postgres, better-sqlite3, sqlite, mongodb
            url?: string
            host?: string
            port?: number
            username?: string
            password?: string
            database?: string // The path of your DB
        })
    ]
})
```
Congratulations, you have now successfully connected your DB with ForgeDB and your client is connected to it now.

<h3 align="center">Android installation</h3><hr>

> [!NOTE]
> This section is for **[Termux](https://github.com/termux/termux-app)** users only!
1. Run the following command to install the `npm packages`:
```bash
npm i @tryforge/forge.db sqlite3
```
2. Once you have installed the packages successfully, you have to go to the **Home** directory of **Termux**.
3. Now, run the following command:
 ```bash
mkdir .gyp
```
4. Now in your code editor inside the `.gyp` folder you created make a file called `include.gypi` and add this code:
```gyp
{'variables':{'android_ndk_path': ''}}
```
5. Now, in your client initialization:
```js
const { ForgeDB } = require("@tryforge/forge.db")

// I'm assuming that the client, can be an app or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB()
    ]
})
```
Congratulations, you have now successfully connected your local DB on your android device using termux. 

<h3 align="center">Events</h3><hr>

- What are DB events?
 > DB events are the events which get triggered when certain activities happen on your DB.
- How are they helpful in developing apps powered by ForgeScript?
 > DB events are really helpful in developing apps owned by ForgeScript, as they help you in monitoring activity in your DB and improve your logs.
- How to use them?
 > Now when you finish configuring your database, you will have to head over to main file of your client and you will have to type this:
```js
const { ForgeDB } = require("@tryforge/forge.db")

const db = new ForgeDB({
    ...options? //The options you have for ForgeDB if you have any
    events: [] /* the events you want to use. 
    Available: `connect`, `variableCreate`, variableUpdate, `variableDelete` */
}) 

const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [ db ]
})

db.commands.add({
    type: "" // Available types: connect, variableCreate, variableUpdate, variableDelete
    code: `Your_Code_Goes_Here`
})
```

<h2 align="center">Credits</h2>

*Thanks for reading till the end and using ForgeDB ;)* <br>
This package was made by with love [aggelos](https://discord.com/users/637648484979441706), an awesome man who develops cool ForgeScript extensions.

Contributor | Contribution | Conatct
-|-|-
Aggelos|Main developer|[Discord](https://discord.com/users/637648484979441706) [GitHub](https://github.com/aggelos-007)
Aditya|Descriptions for functions|[Discord](https://discord.com/users/903681538842054686) [GitHub](https://github.com/clyders)
Aurea| Made this cool readme|[Discord](https://discord.com/users/976413539076026388) [GitHub](https://github.com/aurea6)
Aayush|Fixed grammatical and spelling mistakes|[Discord](https://discord.com/users/1077766221929402378) [GitHub](https://github.com/aayush117)
Koomball|Android installation guide|[Discord](https://discord.com/users/1095378481237475409) [GitHub](https://github.com/koomball)
<h2 align="center">Note from our team</h2>
 coming soon~
