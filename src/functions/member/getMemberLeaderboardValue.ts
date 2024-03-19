import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType } from "../../database"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getMemberLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a member in the leaderboard of a variable",
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
    brackets: true,
    async execute(ctx, [name, sortType, guild, user]) {
        const data = await DataBase.allWithType(`${name}_${guild?.id ?? ctx.guild?.id}`, "member")
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(sortType ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === (user?.id ?? ctx.user?.id))
        return this.success(index + 1)
    },
})