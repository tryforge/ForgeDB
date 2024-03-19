import { ArgType, IExtendedCompiledFunctionField, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType } from "../../database"

export default new NativeFunction({
    name: "$cooldown",
    version: "2.0.0",
    description: "Adds a cooldown to a command.",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the command",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "id",
            rest: false,
            description: "The id to assign the cooldown to, can be anything",
            type: ArgType.String,
            required: true,
        },{
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: ArgType.Enum,
            enum: DataType,
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
        const [, , , , code] = this.data.fields! as IExtendedCompiledFunctionField[]

        const dur = await this["resolveUnhandledArg"](ctx, 3)
        if (!this["isValidReturnType"](dur)) return dur

        const nameV = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](nameV)) return nameV

        const idV = await this["resolveUnhandledArg"](ctx, 1)
        if (!this["isValidReturnType"](idV)) return idV

        const typeV = await this["resolveUnhandledArg"](ctx, 2)
        if (!this["isValidReturnType"](idV)) return idV

        if(DataType[typeV.value] == 'member' && idV.value.split('_').length != 2) return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));

        const cooldown = await DataBase.cdTimeLeft(`${nameV.value}_${idV.value}_${DataType[typeV.value]}`)

        if(cooldown !== 0) {
            const content = await this["resolveCode"](ctx, code)
            if (!this["isValidReturnType"](content)) return content
            ctx.container.content = content.value as string
            await ctx.container.send(ctx.obj)
            return this.stop()
        }

        await DataBase.cdAdd({id: `${nameV.value}_${idV.value}_${DataType[typeV.value]}` as string, duration: dur.value as number})

        return this.success()
    },
})