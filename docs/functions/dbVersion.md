# $dbVersion
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Returns the db version you're using
## Usage
```
$dbVersion
```
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeDB/blob/main/src/functions/dbVersion.ts)
    
</summary>
    
```ts
import { NativeFunction, Return } from "forgescript"

export default new NativeFunction({
    name: "$dbVersion",
    version: "1.0.0",
    description: "Returns the db version you're using",
    unwrap: false,
    execute(ctx) {
        return Return.success(require("../../package.json").version)
    },
})
```
    
</details>
