import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getGuildLeaderboardValue",
    version: "2.0.0",
    description: "Retrieves the position of a guild in the leaderboard of a variable",
    aliases: ["$getServerLeaderboardValue"],
    output: ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to query",
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
            name: "guild ID",
            description: "The guild ID of the value",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, guild]) {
        const data = await DataBase.find({name, type: "guild"})
        const index = data.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))).findIndex((s) => s.id === (guild ?? ctx.guild?.id))
        return this.success(index + 1)
    },
})