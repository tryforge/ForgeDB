import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$setVar",
    description: "Sets an identifier's value in a variable",
    unwrap: true,
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
            description: "The identifier for the value (a user, guild, channel, message, etc)",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, value]) {
        await ForgeDB.set(name, id, value)
        return this.success()
    },
})
