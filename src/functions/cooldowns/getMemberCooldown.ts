import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getMemberCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a member",
    output: ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you are trying to check the cooldown",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "member ID",
            description: "The member id to get its cooldown",
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
        return this.success((await DataBase.cdTimeLeft(DataBase.make_cdIdentifier({name: `${name}-${guild?.id ?? ctx.guild?.id}`, id: id?.id ?? ctx.member?.id}))).left)
    },
})