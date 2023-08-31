import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeQuickDB } from "..";

export default new NativeFunction({
    name: "$deleteVar",
    description: "Deletes a variable value",
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
        }
    ],
    async execute(ctx, [ type, id ]) {
        await ForgeQuickDB.delete(type, id)
        return Return.success()
    },
})