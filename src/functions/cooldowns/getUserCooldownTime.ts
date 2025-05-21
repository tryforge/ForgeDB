import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getUserCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a user",
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
            name: "user ID",
            description: "The user id to get its cooldown",
            rest: false,
            type: ArgType.User,
            required: false,
        },
    ],
    async execute(ctx, [name, id]) {
        return this.success((await DataBase.cdTimeLeft(DataBase.make_cdIdentifier({ name: name, id: id?.id ?? ctx.user?.id }))).left)
    },
})
