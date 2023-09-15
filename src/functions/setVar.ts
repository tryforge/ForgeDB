import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeDB } from "..";

export default new NativeFunction({
    name: "$setVar",
    description: "Sets a variable value.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "id",
            description: "The identifier of a user, guild, channel, message, etc.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "value",
            description: "The value for the variable.",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx, [ name, id, value ]) {
        await ForgeDB.set(name, id, value)
        return Return.success()
    },
})
