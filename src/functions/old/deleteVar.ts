import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteVar",
    version: "1.0.0",
    description: "Deletes a value from a variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "id",
            description: "The identifier of the value (a user, guild, channel, message, etc)",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    async execute(_ctx, [name, id]) {
        await DataBase.delete({
            type: "old",
            id,
            name,
        })
        return this.success()
    },
})
