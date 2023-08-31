import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeQuickDB } from "..";

export default new NativeFunction({
    name: "$setVar",
    description: "Sets a variable value",
    unwrap: true,
    args: [
        {
            name: "type",
            description: "The type of the var, eg server, user, role, etc, up to you.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "id",
            description: "the identifier for the variable",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "value",
            description: "The value for the variable",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    async execute(ctx, [ type, id, value ]) {
        await ForgeQuickDB.set(type, id, value)
        return Return.success()
    },
})