import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteGlobalVar",
    version: "2.0.0",
    description: "Removes a value from a global variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable from which to remove the value",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    async execute(_ctx, [name]) {
        await DataBase.delete({ name, type: "custom" })
        return this.success()
    },
})
