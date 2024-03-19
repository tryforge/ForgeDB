import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$setGuildVar",
    version: "2.0.0",
    description: "Sets an identifier's value in a variable",
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
        },{
            name: "guild ID",
            description: "The guild id of the variable",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, guild]) {
        await DataBase.set({name, id: guild?.id ?? ctx.guild!.id, value, type: "guild"})
        return this.success()
    },
})
