import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteMemberCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given member",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you want the cooldown to get deleted",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "member ID",
            description: "The member's id you want to delete the cooldown",
            rest: false,
            type: ArgType.User,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, id, guild]) {
        DataBase.cdDelete(DataBase.make_cdIdentifier({name: `${name}-${guild?.id ?? ctx.guild?.id}`, id: id?.id ?? ctx.member?.id}))
        return this.success()
    },
})