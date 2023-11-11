# $setVar
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Sets an identifier's value in a variable
## Usage
```
$setVar[name;id;value]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
name | String | The name of the variable | Yes | No
id | String | The identifier for the value (a user, guild, channel, message, etc) | Yes | No
value | String | The value | Yes | No
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/setVar.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction, Return } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$setVar",
    description: "Sets an identifier's value in a variable",
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
            description: "The identifier for the value (a user, guild, channel, message, etc)",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, value]) {
        await ForgeDB.set(name, id, value)
        return Return.success()
    },
})

```
    
</details>