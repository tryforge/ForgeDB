import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteGuildVar",
    version: "2.0.0",
    description: "Removes a value from a guild variable",
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
        {
            name: "guild ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    async execute(ctx, [name, guild]) {
        await DataBase.delete({name, id: guild ?? ctx.guild!.id, type: "guild"})
        return this.success()
    },
})
