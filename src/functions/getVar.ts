import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeQuickDB } from "..";

export default new NativeFunction({
    name: "$getVar",
    description: "Returns a variable value.",
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
            name: "default",
            description: "The default value if the variable is empty.",
            rest: false,
            required: false,
            type: ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx, [ name, id, def ]) {
        let data = await ForgeQuickDB.get(name, id)
        return Return.success(data?.value ?? def)
    },
})
