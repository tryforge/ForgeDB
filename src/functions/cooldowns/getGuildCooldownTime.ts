import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getGuildCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a guild",
    output: ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you are trying to check the cooldown",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "guild ID",
            description: "The guild id to get its cooldown",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
    ],
    async execute(ctx, [name, id]) {
        return this.success((await DataBase.cdTimeLeft(DataBase.make_cdIdentifier({ name: name, id: id?.id ?? ctx.guild?.id }))).left)
    },
})
