"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$getGuildLeaderboardLength",
    version: "2.0.0",
    description: "Returns the length of a guild leaderboard",
    output: forgescript_1.ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "length",
            description: "The length of guilds per page",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false,
        },
        {
            name: "decimals",
            description: "Return decimals for more accurate results, default: false",
            rest: false,
            type: forgescript_1.ArgType.Boolean,
            required: false
        }
    ],
    brackets: true,
    async execute(_ctx, [name, length, decimals]) {
        const data = await database_1.DataBase.allWithType(name, "guild");
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value));
        const number = data.length / (length ?? 1);
        return this.success(decimals ? number : number % 1 ? Math.floor(number) + 1 : number);
    },
});
//# sourceMappingURL=getGuildLeaderboardLength.js.map