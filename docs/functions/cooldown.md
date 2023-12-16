# $cooldown
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Adds a command cooldown
## Usage
```
$cooldown[id;duration;code]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
id | String | The id to assign the cooldown to, can be anything | Yes | No
duration | Time | The duration of the cooldown | Yes | No
code | String | The code to execute if the cooldown is active | No | No
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/cooldown.ts)
    
</summary>
    
```ts
import { ArgType, IExtendedCompiledFunctionField, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$cooldown",
        description: "Adds a command cooldown",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "id",
            rest: false,
            description: "The id to assign the cooldown to, can be anything",
            type: ArgType.String,
            required: true,
        },
        {
            name: "duration",
            description: "The duration of the cooldown",
            rest: false,
            type: ArgType.Time,
            required: true,
        },
        {
            name: "code",
            description: "The code to execute if the cooldown is active",
            rest: false,
            type: ArgType.String,
        },
    ],
    async execute(ctx) {
        const [, , code] = this.data.fields! as IExtendedCompiledFunctionField[]

        const dur = await this["resolveUnhandledArg"](ctx, 1)
        if (!this["isValidReturnType"](dur)) return dur

        const idV = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](idV)) return idV

        const cooldown = await ForgeDB.cdTimeLeft(idV.value as string)

        if(cooldown !== 0) {
            const content = await this["resolveCode"](ctx, code)
            if (!this["isValidReturnType"](content)) return content
            ctx.container.content = content.value as string
            await ctx.container.send(ctx.obj)
            return this.stop()
        }

        await ForgeDB.cdAdd(idV.value as string, dur.value as number)

        return this.success()
    },
})
```
    
</details>