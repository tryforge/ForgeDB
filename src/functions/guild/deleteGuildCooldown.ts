import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$deleteGuildCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given id",
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild's id you want to delete the cooldown",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        DataBase.cdDelete(`${ctx.cmd?.name}_${id?.id ?? ctx.guild?.id}_guild`)
        return this.success()
    },
})