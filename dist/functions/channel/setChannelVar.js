"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$setChannelVar",
    version: "2.0.0",
    description: "Assigns a value to a variable associated with a channel",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to set the value in",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value to be assigned",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "channel ID",
            description: "The channel ID for which to set the variable value",
            rest: false,
            type: forgescript_1.ArgType.Channel,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, value, channel]) {
        await util_1.DataBase.set({ name, id: channel?.id ?? ctx.channel.id, value, type: "channel", guildId: channel?.guild.id ?? ctx.guild?.id });
        return this.success();
    },
});
//# sourceMappingURL=setChannelVar.js.map