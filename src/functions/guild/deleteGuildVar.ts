import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$deleteVar",
    version: "2.0.0",
    description: "Deletes a value from a variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "guild ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, guild]) {
        await DataBase.delete({name, id: guild?.id ?? ctx.guild!.id, type: "guild"})
        return this.success()
    },
})
