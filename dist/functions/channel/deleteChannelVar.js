"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteChannelVar",
    version: "2.0.0",
    description: "Deletes a value from a channel variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "channel ID",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.Channel,
            required: false,
        }
    ],
    async execute(ctx, [name, channel]) {
        await util_1.DataBase.delete({ name, id: channel?.id ?? ctx.channel.id, type: "channel", guildId: channel?.guild.id ?? ctx.guild?.id });
        return this.success();
    },
});
//# sourceMappingURL=deleteChannelVar.js.map