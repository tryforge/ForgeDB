"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getGuildLeaderboardLength",
    version: "2.0.0",
    description: "Retrieves the length of a guild leaderboard",
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
            name: "length",
            description: "The number of guilds per page",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false,
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
    async execute(_ctx, [name, length, decimals]) {
        const data = await util_1.DataBase.find({ name, type: "guild" });
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value));
        const number = data.length / (length ?? 1);
        return this.success(decimals ? number : number % 1 ? Math.floor(number) + 1 : number);
    },
});
//# sourceMappingURL=getGuildLeaderboardLength.js.map