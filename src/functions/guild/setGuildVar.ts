import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setGuildVar",
    version: "2.0.0",
    description: "Assigns a value to a variable associated with a guild",
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
        {
            name: "guild ID",
            description: "The guild ID for which to set the variable value",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, guild]) {
        await DataBase.set({name, id: guild ?? ctx.guild!.id, value, type: "guild"})
        return this.success()
    },
})
