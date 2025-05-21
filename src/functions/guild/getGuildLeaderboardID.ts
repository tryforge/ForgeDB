import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, SortType } from "../../util"

export default new NativeFunction({
    name: "$getGuildLeaderboardID",
    version: "2.1.0",
    description: "Returns the guild in the leaderboard of a specified position",
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
            description: "The position of the guild to find",
            rest: false,
            type: ArgType.Number,
            required: true,
        },
    ],
    output: ArgType.Guild,
    async execute(ctx, [name, sortType, pos]) {
        const data = await DataBase.find({ name, type: "guild" })
        const guild = data.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value)))[pos - 1]
        return this.success(guild?.id)
    },
})
