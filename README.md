<p align="center"><img src="https://cdn.discordapp.com/emojis/1185683362334134362.png?size=1024" alt="ForgeDB logo"></p>
<h1 align="center">ForgeDB</h1><p align="center">An advanced DataBase extension for ForgeScript powered apps.</p>

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
   - [Android-installation](#android-installation)
2. [Default Variables](#default-variables)
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
   const { ForgeClient } = require("@tryforge/forgescript")
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

1. Run the following command to install the required `npm packages`:
   ```bash
   npm i @tryforge/forge.db mongodb
   ```
2. Now, in your client initialization:
   ```js
   const { ForgeClient } = require("@tryforge/forgescript")
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
Congratulations, you have successfully connected your client to a MongoDB database.

<h3 align="center">Other Installation</h3><hr>
<p align="center">You're here because you want to try other DBs. So now just follow the steps below to set up your bot to work with other DBs:</p>

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
     > *MySQL has two versions, you can use either of them.*
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
3. Now that you have installed your preferred DB package, you now have to connect it with ForgeDB and ForgeScript:
   ```js
   const { ForgeClient } = require("@tryforge/forgescript")
   const { ForgeDB } = require("@tryforge/forge.db")
   
   // I'm assuming that the client, can be an app or anything else
   const client = new ForgeClient({
       ...options // The options you currently have
       extensions: [
            new ForgeDB({
               type: ""; // You've to put the DB you want to use. Available: mysql, postgres, better-sqlite3, sqlite, mongodb
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

Congratulations, you have now successfully connected your database to ForgeDB and your client.

<h3 align="center">Android Installation</h3><hr>
<p align="center">You are here because your an android user and have already followed on setting up <a href="https://docs.botforge.org/p/ForgeDB/#docs-22-host-your-bot-on-android">ForgeScript on android</a> and are using ACode & Termux.</p>

1. You have to go in the `home` directory run this command:
  ```bash
  mkdir .gyp
  ```
2. Now you have to open ACode and open Termux's `home` directory and make a new file named `include.gypi`.
3. Now open `include.gypi` and paste this code:
  ```gypi
  {'variables':{'android_ndk_path': ''}}
  ```
4. Now save the file and open Termux again.
5. Now open the directory where you've setup your bot and run this command:
  ```bash
  npm i @tryforge/forge.db
  ```
<strong>It is not recommended to store data on your device, using a VPS server or any other thing to host your bot is recommend.</strong>

<h3 align="center">Default variables</h3><hr>

- What's this?
  > Default Variables are a type of variable that are predifined in ForgeDB. These are variables in which you can set the default values of the variables manually. These are quite to what you can find in Projects Like [Aoi.JS](https://npmjs.com/package/aoi.js) and [BDFD](https://botdesignerdiscord.com). But there's a cstch these are optional to use.
- Why should you use it?
  > There are many benefits of using default variables. F.e. you've got a premium guild system. When your bot joins a new guild, the default value can be set to false. So you won't have to worry about writing a spaghetti code to just set the variable when the bot joins a new guild. Well thanks to this function, it's already done for you. Do you know what, you've saved yourself from cooking a spaghetti code and saved tons of time, and made your app efficient.
- What're the requirements? Can I use it in any DB setup?
  > Well yes, you can use it in any DB setup. The requirements are simple, you just need to use ForgeDB v2.0.0 or higher.
- How do you use them?
  > Well, they're pretty much easy-to-use, just like counting how many fingers you've got. You just head over to the main file of your client and add this:
   ```js
   // ForgeDB Default Variables
   // You've to put this part after client initialization
   ForgeDB.variables({
   name: "value" 
   })
   ```
  > Now you've made a default variable, but how do you use it? It's just as easy as herding cats, you go to your code and just do this withcraft:
   ```js
   /* Once again I'm assuming you've made all the setup*/
   code: `
   $getUserVar[name;userID;default value]
   `
   ```

<h3 align="center">Events</h3><hr>

- What are DB events?
  > DB events are the events which get triggered when certain activities happen in your DB.
- How are they helpful in developing apps powered by ForgeScript?
  > DB events are really helpful in developing apps powered by ForgeScript, as they help you in monitoring activity in your DB and improve your logs.
- How to use them?
  > Now when you finish configuring your database, you will have to head over to the main file of your client and you will have to type this:

  ```js
  const { ForgeClient } = require("@tryforge/forgescript")
  const { ForgeDB } = require("@tryforge/forge.db")
  const db = new ForgeDB({
      ...options? // The options you have for ForgeDB, if any.
      events: [] /* The events you want to use. 
      Available: connect, variableCreate, variableUpdate, variableDelete */
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
This package was made with love by [aggelos](https://discord.com/users/637648484979441706), an awesome man who develops cool ForgeScript extensions.

Contributor | Contribution | Contact
-|-|-
Aggelos|Main Developer|[Discord](https://discord.com/users/637648484979441706) [GitHub](https://github.com/aggelos-007)
Aditya|Descriptions for functions|[Discord](https://discord.com/users/903681538842054686) [GitHub](https://github.com/clyders)
Aurea|Made this cool ReadMe|[Discord](https://discord.com/users/976413539076026388) [GitHub](https://github.com/aurea6)
Aayush|Fixed grammatical and spelling mistakes|[Discord](https://discord.com/users/1077766221929402378) [GitHub](https://github.com/aayush117)
Koomball|Added Android installation|[Discord](https://discord.com/users/1095378481237475409) [GitHub](https://github.com/koomball)
Econome|Guide for default variables|[Discord](https://discord.com/users/838105973985771520) [GitHub](https://github.com/project-econome)
