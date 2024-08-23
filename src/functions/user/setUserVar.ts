import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setUserVar",
    version: "2.0.0",
    description: "Sets a user's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },{
            name: "user ID",
            description: "The user id of the variable",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, user]) {
        await DataBase.set({name, id: user ?? ctx.user!.id, value, type: "user"})
        return this.success()
    },
})
