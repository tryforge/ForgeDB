import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseGuildTextChannel } from 'discord.js'
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setChannelVar",
    version: "2.0.0",
    description: "Sets an channel's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },{
            name: "channel ID",
            description: "The channel id of the variable",
            rest: false,
            type: ArgType.Channel,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, channel]) {
        await DataBase.set({name, id: channel?.id ?? ctx.channel!.id, value, type: "channel", guildId: (channel as BaseGuildTextChannel)?.guild.id ?? ctx.guild?.id})
        return this.success()
    },
})