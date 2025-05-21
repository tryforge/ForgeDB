"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getGuildLeaderboardID",
    version: "2.1.0",
    description: "Returns the guild in the leaderboard of a specified position",
    aliases: ["$getServerLeaderboardID"],
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
            description: "The position of the guild to find",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true,
        },
    ],
    output: forgescript_1.ArgType.Guild,
    async execute(ctx, [name, sortType, pos]) {
        const data = await util_1.DataBase.find({ name, type: "guild" });
        const guild = data.sort((x, y) => (sortType === util_1.SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value)))[pos - 1];
        return this.success(guild?.id);
    },
});
//# sourceMappingURL=getGuildLeaderboardID.js.map