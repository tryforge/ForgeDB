import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$getMemberLeaderboardLength",
    version: "2.0.0",
    description: "Returns the length of a user leaderboard",
    output: ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "guild ID",
            description: "The guild id where the member belongs to",
            rest: false,
            type: ArgType.Guild,
            required: false
        },
        {
            name: "length",
            description: "The length of users per page",
            rest: false,
            type: ArgType.Number,
            required: false,
        },
        {
            name: "decimals",
            description: "Return decimals for more accurate results, default: false",
            rest: false,
            type: ArgType.Boolean,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [name, guild,length, decimals]) {
        const data = await DataBase.allWithType(`${name}_${guild?.id ?? ctx.guild?.id}`, "member")
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const number = data.length / (length ?? 1)         
        return this.success(decimals ? number :  number % 1 ? Math.floor(number) + 1 : number)
    },
})
