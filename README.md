# ForgeDB
Easy to use database for forge.

[![forgedb](https://img.shields.io/github/package-json/v/tryforge/ForgeDB/main?label=forgedb&color=5c16d4)](https://github.com/tryforge/ForgeDB/)
[![forgescript](https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=forgescript&color=5c16d4)](https://github.com/tryforge/ForgeScript/)
[![Discord](https://img.shields.io/discord/739934735387721768?logo=discord)](https://discord.gg/hcJgjzPvqb)

## How to use

Download this npm package:
```bash
npm i forgedb
```

Now, in your client initialization:
```ts
const { ForgeDB } = require("forgedb")

// I'll assume client, can be bot or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeDB()
    ]
})
```
And voilà, you now have database functions loaded to your bot. <br>
Check our [docs/functions folder](https://github.com/tryforge/ForgeDB/tree/main/docs/functions) for info of all functions available.
