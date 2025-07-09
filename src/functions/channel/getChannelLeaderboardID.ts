import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, SortType } from "../../util"

export default new NativeFunction({
    name: "$getChannelLeaderboardID",
    version: "2.1.0",
    description: "Returns the channel in the leaderboard of a specified position",
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
            type: ArgType.Enum,
            enum: SortType,
        },
        {
            name: "position",
            description: "The position of the channel to find",
            rest: false,
            type: ArgType.Number,
            required: true,
        },
    ],
    output: ArgType.User,
    async execute(ctx, [name, sortType, pos]) {
        const data = await DataBase.find({ name, type: "channel", guildId: ctx.guild!.id })
        const channel = data.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value)))[pos - 1]
        return this.success(channel?.id)
    },
})
