import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteMemberVar",
    version: "2.0.0",
    description: "Deletes a value from a member variable",
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
            name: "member ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.User,
            required: false,
        },{
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, member, guild]) {
        await DataBase.delete({name, id: member?.id ?? ctx.member!.id, type: "member", guildId: guild?.id ?? ctx.guild!.id})
        return this.success()
    },
})