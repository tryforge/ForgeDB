import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$getGuildCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a guild",
    output: ArgType.Number,
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild id to get its cooldown",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        return this.success(await DataBase.cdTimeLeft(`${ctx.cmd?.name}_${id?.id ?? ctx.guild?.id}_guild`))
    },
})