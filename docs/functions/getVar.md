# $getVar
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Returns a variable value
## Usage
```
$getVar
```
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/getVar.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeQuickDB } from "..";

export default new NativeFunction({
    name: "$getVar",
    description: "Returns a variable value",
    unwrap: true,
    args: [
        {
            name: "type",
            description: "The type of the var, eg server, user, role, etc, up to you.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "id",
            description: "the identifier for the variable",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "default value",
            description: "The default value to use",
            rest: false,
            type: ArgType.String
        }
    ],
    async execute(ctx, [ type, id, def ]) {
        const data = await ForgeQuickDB.get(type, id)
        return Return.success(data?.value ?? def)
    },
})
```
    
</details>