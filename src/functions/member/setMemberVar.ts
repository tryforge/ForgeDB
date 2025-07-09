import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setMemberVar",
    version: "2.0.0",
    description: "Sets a member's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value to set",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "member ID",
            description: "The ID of the member",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild ID",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, value, member, guild]) {
        await DataBase.set({ name, id: member ?? ctx.member!.id, value, type: "member", guildId: guild?.id ?? ctx.guild!.id })
        return this.success()
    },
})
