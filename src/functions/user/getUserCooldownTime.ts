import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$getUserCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a user",
    output: ArgType.Number,
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "user ID",
            description: "The user id to get its cooldown",
            rest: false,
            type: ArgType.User,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        return this.success(await DataBase.cdTimeLeft(`${ctx.cmd?.name}_${id?.id ?? ctx.user?.id}_user`))
    },
})