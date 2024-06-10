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
            type: ArgType.User,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, user]) {
        const data = await DataBase.find({name, type: "user"})
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(sortType && sortType.toString() !== '' ? sortType : 'asc') === -1 ? data : [...data].reverse()).findIndex((s) => s.id === (user?.id ?? ctx.user?.id))
        return this.success(index + 1)
    },
})
