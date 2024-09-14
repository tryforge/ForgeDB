import { ArgType, IExtendedCompiledFunctionField, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$channelCooldown",
    version: "2.0.0",
    description: "Imposes a cooldown period for a command within a specific channel.",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the command for which you wish to set a cooldown.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "duration",
            description: "The length of time the cooldown will last.",
            rest: false,
            type: ArgType.Time,
            required: true,
        },
        {
            name: "code",
            description: "The code to execute when the cooldown is in effect.",
            rest: false,
            type: ArgType.String,
        },
        {
            name: "channel ID",
            rest: false,
            description: "The unique identifier (id) of the channel to apply the cooldown to.",
            type: ArgType.Channel,
            required: false,
        }
    ],
    async execute(ctx) {
        const [, , code] = this.data.fields! as IExtendedCompiledFunctionField[]
        const dur = await this["resolveUnhandledArg"](ctx, 1)
        if (!this["isValidReturnType"](dur)) return dur
        
        const nameV = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](nameV)) return nameV

        const idV = await this["resolveUnhandledArg"](ctx, 3)
        if (!this["isValidReturnType"](idV)) return idV
        
        const cooldown = await DataBase.cdTimeLeft(DataBase.make_cdIdentifier({name: nameV.value, id: idV.value?.id ?? ctx.channel?.id}))

        if(cooldown.left !== 0) {
            ctx.setEnvironmentKey("time", cooldown.left)
            const content = await this["resolveCode"](ctx, code)
            if (!this["isValidReturnType"](content)) return content
            ctx.container.content = content.value as string
            await ctx.container.send(ctx.obj)
            return this.stop()
        }

        await DataBase.cdAdd({name: nameV.value as string, id: idV.value?.id ?? ctx.channel?.id, duration: dur.value as number})

        return this.success()
    },
})
