# $getDB
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Returns all the identifiers stored in the DB
## Usage
```
$getDB
```
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/getDB.ts)
    
</summary>
    
```ts
import { NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getDB",
    description: "Returns all the identifiers stored in the DB",
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await ForgeDB.all())
    },
})

```
    
</details>