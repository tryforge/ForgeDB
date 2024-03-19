import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$deleteMemberVar",
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
    async execute(ctx, [name, guild, member]) {
        await DataBase.delete({name: `${name}_${guild?.id ?? ctx.guild?.id}`, id: member?.id ?? ctx.user!.id, type: "member"})
        return this.success()
    },
})
