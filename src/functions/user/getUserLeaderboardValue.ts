import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getUserLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a user in the leaderboard of a specified variable",
    output: ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "variableName",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "sortType",
            description: "The sort type for the leaderboard: 'asc' (ascending) or 'desc' (descending)",
            rest: false,
            type: ArgType.Enum,
            enum: SortType,
        },{
            name: "userID",
            description: "The user ID of the value",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, user]) {
        const data = await DataBase.find({name, type: "user"})
        const index = data.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))).findIndex((s) => s.id === (user ?? ctx.user?.id))
        return this.success(index + 1)
    },
})