import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$deleteUserCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given id",
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "user ID",
            description: "The user's id you want to delete the cooldown",
            rest: false,
            type: ArgType.User,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        DataBase.cdDelete(`${ctx.cmd?.name}_${id?.id ?? ctx.user?.id}_user`)
        return this.success()
    },
})