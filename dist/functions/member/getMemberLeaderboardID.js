"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getMemberLeaderboardID",
    version: "2.1.0",
    description: "Returns the member in the leaderboard of a specified position",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "sort type",
            description: "The sort order for the leaderboard, either ascending (asc) or descending (desc)",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Enum,
            enum: util_1.SortType,
        },
        {
            name: "position",
            description: "The position of the member to find",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true,
        },
        {
            name: "guild ID",
            description: "The guild ID to which the member belongs",
            rest: false,
            type: forgescript_1.ArgType.Guild,
        },
    ],
    output: forgescript_1.ArgType.Member,
    async execute(ctx, [name, sortType, pos, guild]) {
        const data = await util_1.DataBase.find({ name, type: "member", guildId: guild?.id ?? ctx.guild.id });
        const member = data.sort((x, y) => (sortType === util_1.SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value)))[pos - 1];
        return this.success(member?.id);
    },
});
//# sourceMappingURL=getMemberLeaderboardID.js.map