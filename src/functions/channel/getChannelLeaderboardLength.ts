import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getChannelLeaderboardLength",
    version: "2.0.0",
    description: "Returns the total number of entries in a channel leaderboard.",
    output: ArgType.Number,
    unwrap: true,
    args: [
            {
              "name": "name",
              "description": "The name of the variable to query",
              "rest": false,
              "type": "ArgType.String",
              "required": true
            },
            {
              "name": "guild ID",
              "description": "The guild ID for which to retrieve channel variables",
              "rest": false,
              "type": "ArgType.Guild",
              "required": false
            },
            {
              "name": "length",
              "description": "The number of users per page",
              "rest": false,
              "type": "ArgType.Number",
              "required": false
            },
            {
              "name": "decimals",
              "description": "Specify whether to return decimals for more precise results (default: false)",
              "rest": false,
              "type": "ArgType.Boolean",
              "required": false
            }
    ],
    brackets: true,
    async execute(ctx, [name, guild, length, decimals]) {
        const data = await DataBase.find({name, type: "channel", guildId: guild?.id ?? ctx.guild!.id})
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const number = data.length / (length ?? 1)         
        return this.success(decimals ? number :  number % 1 ? Math.floor(number) + 1 : number)
    },
})
