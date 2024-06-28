# ForgeDB
An advanced DataBase extension for ForgeScript.

[![@tryforge/forge.db](https://img.shields.io/github/package-json/v/tryforge/ForgeDB/main?label=@tryforge/forge.db&color=5c16d4)](https://github.com/tryforge/ForgeDB/)
[![@tryforge/forgescript](https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4)](https://github.com/tryforge/ForgeScript/)
[![Discord](https://img.shields.io/discord/739934735387721768?logo=discord)](https://discord.gg/hcJgjzPvqb)

## Table of Contents
1. Installation
    - [Quick Installation](#quick-installation)
    - [MongoDB Installation](#mongodb-installation)
    - [Other DB Installation](#other-db-installation)
2. [How to use Events](#how-to-use-events)
3. [How to update](https://github.com/tryforge/ForgeDB/blob/main/guides/how-to-update.md)
4. [Documentation](https://docs.botforge.org/p/ForgeDB/)
5. [Credits](#credits)

### Quick Installation

Download these npm packages:
```bash
npm i @tryforge/forge.db sqlite3
```

Now, in your client initialization:
```ts
const { ForgeDB } = require("@tryforge/forge.db")

// I'll assume client, can be bot or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB()
    ]
})
```
And voi-la, you bot now has been connected a local database.

### MongoDB Installation

Download these npm packages:
```bash
npm i @tryforge/forge.db mongodb
```

Now, in your client initialization:
```ts
const { ForgeDB } = require("@tryforge/forge.db")

// I'll assume client, can be bot or anything else
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
And voi-la, you bot now has been connected a mongo database.

### Other DB Installation
If you want to install other dbs you need to follow these steps:
1. Install forge.db package 
```bash
npm i @tryforge/forge.db
```

2. Install your db package
    - For `better-sqlite3`
    ```bash
    npm i better-sqlite3
    ```
    - For `mysql`
    ```bash
    npm i mysql # or npm i mysql2
    ```
    - For `postgres`
    ```bash
    npm i postgres
    ```
3. Connect ForgeDB with ForgeScript
```ts
const { ForgeDB } = require("@tryforge/forge.db")

// I'll assume client, can be bot or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB({
            type: "mysql" | "postgres" | "better-sqlite3";
            url?: string
            host?: string
            port?: number
            username?: string
            password?: string
            database?: string //the path of your db
        })
    ]
})
```
And voi-la, you bot now has been connected a database.

### How to use Events
Once you configure your database you will head over to the main file of your bot and you will type this
```ts
const { ForgeDB } = require("@tryforge/forge.db")

const db = new ForgeDB({
    ...options? //The options you have for ForgeDB if you have any
    events: [] //the events you want to use.
    //Available: `connect`, `variableCreate`, variableUpdate, `variableDelete`
}) 

const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [ db ]
})

db.commands.add({
    type: "connect" | "variableCreate" | "variableUpdate" | "variableDelete"
    code: `Your_Code_Goes_Here`
})
```
And voi-la, you learnt how to use database events!

## Credits
Thanks for reading this guide and for using ForgeDB <br>
This package was made by with love [aggelos](https://discord.com/users/637648484979441706), a developer of ForgeScript. Use ForgeScript, it's better and easier.

Also huge thanks to [aditya](https://discord.com/users/903681538842054686) and [aurea](https://discord.com/users/976413539076026388) for their contributions <3
