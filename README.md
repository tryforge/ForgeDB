# ForgeQuickDB
Easy to use database for forge.
## How to use
> Make sure to have installed typescript package as dependency, if installing from github.

Download this repo as a npm package:
```bash
npm i https://github.com/tryforge/ForgeQuickDB.git
```

Now, in your client initialization:
```ts
const { ForgeQuickDB } = require("forgequickdb")

// I'll assume client, can be bot or anything else
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new ForgeQuickDB()
    ]
})
```
And voi-la, you now have database functions loaded to your bot. <br>
Check our docs/functions folder for info of all functions available.