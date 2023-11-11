# $getVar
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Returns an identifier's value in a variable
## Usage
```
$getVar[name;id;default]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
name | String | The name of the variable | Yes | No
id | String | The identifier of the value (a user, guild, channel, message, etc) | Yes | No
default | String | The default value if the identifier doesn't exist in the variable | No | No
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/getVar.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction, Return } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getVar",
    description: "Returns an identifier's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "id",
            description: "The identifier of the value (a user, guild, channel, message, etc)",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "default",
            description: "The default value if the identifier doesn't exist in the variable",
            rest: false,
            required: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, def]) {
        const data = await ForgeDB.get(name, id)
        return Return.success(data?.value ?? def)
    },
})

```
    
</details>