import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getGlobalCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a global",
    output: ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you are trying to check the cooldown",
            rest: false,
            type: ArgType.String,
            required: true,
        }
    ],
    async execute(_ctx, [name]) {
        return this.success((await DataBase.cdTimeLeft(DataBase.make_cdIdentifier({name}))).left)
    },
})