import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setGlobalVar",
    version: "2.0.0",
    description: "Assigns a value to a variable associated with a global",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to set the value in",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value to be assigned",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, value]) {
        await DataBase.set({ name, value, type: "custom" })
        return this.success()
    },
})
