# $dbVersion
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Returns the version of ForgeDB
## Usage
```
$dbVersion
```
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/dbVersion.ts)
    
</summary>
    
```ts
import { NativeFunction, Return } from "forgescript"

export default new NativeFunction({
    name: "$dbVersion",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute() {
        return Return.success(require("../../package.json").version)
    },
})

```
    
</details>