import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, SortType } from "../../util"

export default new NativeFunction({
    name: "$getMemberLeaderboardID",
    version: "2.1.0",
    description: "Returns the member in the leaderboard of a specified position",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "sort type",
            description: "The sort order for the leaderboard, either ascending (asc) or descending (desc)",
            rest: false,
            required: true,
            type: ArgType.Enum,
            enum: SortType,
        },
        {
            name: "position",
            description: "The position of the member to find",
            rest: false,
            type: ArgType.Number,
            required: true,
        },
        {
            name: "guild ID",
            description: "The guild ID to which the member belongs",
            rest: false,
            type: ArgType.Guild,
        },
    ],
    output: ArgType.Member,
    async execute(ctx, [name, sortType, pos, guild]) {
        const data = await DataBase.find({ name, type: "member", guildId: guild?.id ?? ctx.guild!.id })
        const member = data.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value)))[pos - 1]
        return this.success(member?.id)
    },
})
