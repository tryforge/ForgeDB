import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseGuildTextChannel } from "discord.js"
import { DataBase, SortType } from "../../util"

export default new NativeFunction({
    name: "$getChannelLeaderboardValue",
    version: "2.0.0",
    description: "Fetches the position of a channel in the leaderboard of a variable",
    aliases: ["$getChannelLeaderboardPosition"],
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
            name: "channel ID",
            description: "The channel ID of the value",
            rest: false,
            type: ArgType.Channel,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, sortType, channel]) {
        const data = await DataBase.find({ name, type: "channel", guildId: (channel as BaseGuildTextChannel)?.guild.id ?? ctx.guild?.id })
        const index = data.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))).findIndex((s) => s.id === (channel ?? ctx.channel?.id))
        return this.success(index + 1)
    },
})
