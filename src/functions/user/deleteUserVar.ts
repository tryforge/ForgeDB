import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteUserVar",
    version: "2.0.0",
    description: "Deletes a value from a user variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "user ID",
            description: "The ID of the user",
            rest: false,
            type: ArgType.User,
            required: false,
        }
    ],
    async execute(ctx, [name, user]) {
        await DataBase.delete({name, id: user?.id ?? ctx.user!.id, type: "user"})
        return this.success()
    },
})
