import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$getMemberCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a member",
    output: ArgType.Number,
    brackets: false,
    unwrap: true,
    args: [
        {
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
    async execute(ctx, [guild, id]) {
        return this.success(await DataBase.cdTimeLeft(`${ctx.cmd?.name}_${guild?.id ?? ctx.guild?.id}_${id?.id ?? ctx.user?.id}_member`))
    },
})