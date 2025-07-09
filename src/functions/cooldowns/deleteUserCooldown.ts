import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteUserCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given user",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you want the cooldown to get deleted",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "user ID",
            description: "The user's id you want to delete the cooldown",
            rest: false,
            type: ArgType.User,
            required: false,
        },
    ],
    async execute(ctx, [name, id]) {
        DataBase.cdDelete(DataBase.make_cdIdentifier({ name: name, id: id?.id ?? ctx.user?.id }))
        return this.success()
    },
})
