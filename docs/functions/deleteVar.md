# $deleteVar
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Deletes a variable value
## Usage
```
$deleteVar
```
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/deleteVar.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeQuickDB } from "..";

export default new NativeFunction({
    name: "$deleteVar",
    description: "Deletes a variable value",
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
        }
    ],
    async execute(ctx, [ type, id ]) {
        await ForgeQuickDB.delete(type, id)
        return Return.success()
    },
})
```
    
</details>