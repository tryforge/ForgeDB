import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteGlobalCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given global",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you want the cooldown to get deleted",
            rest: false,
            type: ArgType.String,
            required: true,
        }
    ],
    async execute(_ctx, [name]) {
        DataBase.cdDelete(DataBase.make_cdIdentifier({name}))
        return this.success()
    },
})