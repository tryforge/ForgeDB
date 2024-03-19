import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getGuildLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a guild in the leaderboard of a variable",
    output: ArgType.Number,
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
            name: "sort type",
            description: "The sort type for the leaderboard, either asc/0 (ascending) or desc/1 (descending)",
            rest: false,
            type: ArgType.Enum,
            enum: SortType,
        },{
            name: "guild ID",
            description: "The guild id of the value",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, guild]) {
        const data = await DataBase.allWithType(name, "guild")
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(sortType ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === (guild?.id ?? ctx.guild?.id))
        return this.success(index + 1)
    },
})
