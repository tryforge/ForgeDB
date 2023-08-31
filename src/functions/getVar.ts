import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeQuickDB } from "..";

export default new NativeFunction({
    name: "$getVar",
    description: "Returns a variable value",
    unwrap: true,
    brackets: true,
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
            name: "default value",
            description: "The default value to use",
            rest: false,
            type: ArgType.String
        }
    ],
    async execute(ctx, [ type, id, def ]) {
        const data = await ForgeQuickDB.get(type, id)
        return Return.success(data?.value ?? def)
    },
})