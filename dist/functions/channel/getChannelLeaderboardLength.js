"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getChannelLeaderboardLength",
    version: "2.0.0",
    description: "Returns the total number of entries in a channel leaderboard.",
    output: forgescript_1.ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to query",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "guild ID",
            description: "The guild ID for which to retrieve channel variables",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false
        },
        {
            name: "length",
            description: "The number of users per page",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        },
        {
            name: "decimals",
            description: "Specify whether to return decimals for more precise results (default: false)",
            rest: false,
            type: forgescript_1.ArgType.Boolean,
            required: false
        }
    ],
    brackets: true,
    async execute(ctx, [name, guild, length, decimals]) {
        const data = await util_1.DataBase.find({ name, type: "channel", guildId: guild?.id ?? ctx.guild.id });
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value));
        const number = data.length / (length ?? 1);
        return this.success(decimals ? number : number % 1 ? Math.floor(number) + 1 : number);
    },
});
//# sourceMappingURL=getChannelLeaderboardLength.js.map