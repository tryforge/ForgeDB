import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteMemberVar",
    version: "2.0.0",
    description: "Removes a value from a member variable",
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
            name: "member ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild to which the member belongs",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    async execute(ctx, [name, member, guild]) {
        await DataBase.delete({name, id: member ?? ctx.member!.id, type: "member", guildId: guild ?? ctx.guild!.id})
        return this.success()
    },
})
