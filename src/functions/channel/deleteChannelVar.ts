import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseGuildTextChannel } from "discord.js"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteChannelVar",
    version: "2.0.0",
    description: "Removes a value from a variable associated with a channel.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "channel ID",
            description: "The unique identifier of the value to delete.",
            rest: false,
            type: ArgType.Channel,
            required: false,
        },
    ],
    async execute(ctx, [name, channel]) {
        await DataBase.delete({ name, id: channel?.id ?? ctx.channel!.id, type: "channel", guildId: (channel as BaseGuildTextChannel)?.guild.id ?? ctx.guild?.id })
        return this.success()
    },
})
