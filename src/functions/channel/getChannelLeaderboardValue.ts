import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseGuildTextChannel } from 'discord.js'
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getChannelLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a channel in the leaderboard of a variable",
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
            name: "channel ID",
            description: "The channel id of the value",
            rest: false,
            type: ArgType.Channel,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, channel]) {
        const data = await DataBase.find({name, type: "channel", guildId: (channel as BaseGuildTextChannel)?.guild.id ?? ctx.guild?.id})
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(sortType ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === (channel?.id ?? ctx.channel?.id))
        return this.success(index + 1)
    },
})