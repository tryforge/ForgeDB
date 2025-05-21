"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getGuildLeaderboardValue",
    version: "2.0.0",
    description: "Retrieves the position of a guild in the leaderboard of a variable",
    aliases: ["$getServerLeaderboardValue", "$getGuildLeaderboardPosition", "$getServerLeaderboardPosition"],
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
            name: "guild ID",
            description: "The guild ID of the value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, sortType, guild]) {
        const data = await util_1.DataBase.find({ name, type: "guild" });
        const index = data.sort((x, y) => (sortType === util_1.SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))).findIndex((s) => s.id === (guild ?? ctx.guild?.id));
        return this.success(index + 1);
    },
});
//# sourceMappingURL=getGuildLeaderboardValue.js.map