"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getChannelLeaderboardValue",
    version: "2.0.0",
    description: "Fetches the position of a channel in the leaderboard of a variable",
    aliases: ["$getChannelLeaderboardPosition"],
    output: forgescript_1.ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to query",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "sort type",
            description: "The sort order for the leaderboard, either ascending (asc) or descending (desc)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: util_1.SortType,
        },
        {
            name: "channel ID",
            description: "The channel ID of the value",
            rest: false,
            type: forgescript_1.ArgType.Channel,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, sortType, channel]) {
        const data = await util_1.DataBase.find({ name, type: "channel", guildId: channel?.guild.id ?? ctx.guild?.id });
        const index = data.sort((x, y) => (sortType === util_1.SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))).findIndex((s) => s.id === (channel ?? ctx.channel?.id));
        return this.success(index + 1);
    },
});
//# sourceMappingURL=getChannelLeaderboardValue.js.map