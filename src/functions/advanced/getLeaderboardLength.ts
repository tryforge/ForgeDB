import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType } from "../../database"

export default new NativeFunction({
    name: "$getLeaderboardLength",
    version: "2.0.0",
    description: "Returns the length of a leaderboard",
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
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: ArgType.Enum,
            enum: DataType,
            required: true,
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
    async execute(_ctx, [name, type, length, decimals]) {
        const data = await DataBase.allWithType(name, DataType[type])
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const number = data.length / (length ?? 1)         
        return this.success(decimals ? number :  number % 1 ? Math.floor(number) + 1 : number)
    },
})
