import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getGuildLeaderboardLength",
    version: "2.0.0",
    description: "Retrieves the length of a guild leaderboard",
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
            name: "length",
            description: "The number of guilds per page",
            rest: false,
            type: ArgType.Number,
            required: false,
        },
        {
            name: "decimals",
            description: "Specify whether to return decimals for more precise results (default: false)",
            rest: false,
            type: ArgType.Boolean,
            required: false
        }
    ],
    brackets: true,
    async execute(_ctx, [name, length, decimals]) {
        const data = await DataBase.find({name, type: "guild"})
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const number = data.length / (length ?? 1)         
        return this.success(decimals ? number :  number % 1 ? Math.floor(number) + 1 : number)
    },
})
