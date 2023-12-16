import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$deleteVar",
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
    async execute(_ctx, [type, id]) {
        await ForgeDB.delete(type, id)
        return this.success()
    },
})
