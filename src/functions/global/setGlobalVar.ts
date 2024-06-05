import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setGlobalVar",
    version: "2.0.0",
    description: "Sets a global's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        }
    ],
    brackets: true,
    async execute(_ctx, [name, value]) {
        await DataBase.set({name, value, type: "custom"})
        return this.success()
    },
})