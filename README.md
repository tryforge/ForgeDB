# ForgeDB
Easy to use database for forge.

[![@tryforge/forge.db](https://img.shields.io/github/package-json/v/tryforge/ForgeDB/main?label=@tryforge/forge.db&color=5c16d4)](https://github.com/tryforge/ForgeDB/)
[![@tryforge/forgescript](https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4)](https://github.com/tryforge/ForgeScript/)
[![Discord](https://img.shields.io/discord/739934735387721768?logo=discord)](https://discord.gg/hcJgjzPvqb)
## How to use

Download this npm package:
```bash
npm i @tryforge/forge.db
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
And voi-la, you now have database functions loaded to your bot. <br>
Check our [docs/functions folder](https://docs.botforge.org/p/ForgeDB/) for info of all functions available.
