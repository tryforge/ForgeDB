import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeDB } from "..";

export default new NativeFunction({
    name: "$deleteVar",
    description: "Deletes a variable value.",
    unwrap: true,
    brackets: true,
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
        }
    ],
    async execute(_ctx, [ type, id ]) {
        await ForgeDB.delete(type, id)
        return Return.success()
    },
})
