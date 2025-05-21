import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseGuildTextChannel } from "discord.js"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setChannelVar",
    version: "2.0.0",
    description: "Assigns a value to a variable associated with a channel",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to set the value in",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value to be assigned",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "channel ID",
            description: "The channel ID for which to set the variable value",
            rest: false,
            type: ArgType.Channel,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, value, channel]) {
        await DataBase.set({ name, id: channel?.id ?? ctx.channel!.id, value, type: "channel", guildId: (channel as BaseGuildTextChannel)?.guild.id ?? ctx.guild?.id })
        return this.success()
    },
})
