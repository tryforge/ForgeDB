"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getChannelCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a channel",
    output: forgescript_1.ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you are trying to check the cooldown",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "channel ID",
            description: "The channel id to get its cooldown",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, id]) {
        return this.success((await util_1.DataBase.cdTimeLeft(util_1.DataBase.make_cdIdentifier({ name: name, id: id?.id ?? ctx.channel?.id }))).left);
    },
});
//# sourceMappingURL=getChannelCooldownTime.js.map