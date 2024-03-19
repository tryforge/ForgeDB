import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$setMemberVar",
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
            description: "The guild id where the member belongs to",
            rest: false,
            type: ArgType.Guild,
            required: false
        },{
            name: "member ID",
            description: "The member id of the variable",
            rest: false,
            type: ArgType.User,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, guild, member]) {
        await DataBase.set({name: `${name}_${guild?.id ?? ctx.guild?.id}`, id: member?.id ?? ctx.member!.id, value, type: "member"})
        return this.success()
    },
})
