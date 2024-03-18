"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$getLeaderboardLength",
    description: "Returns the length of a leaderboard",
    output: forgescript_1.ArgType.Number,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: database_1.DataType,
            required: true,
        },
        {
            name: "length",
            description: "The length of users per page",
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
    async execute(_ctx, [name, type, length, decimals]) {
        const data = await database_1.DataBase.allWithType(name, database_1.DataType[type]);
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value));
        const number = data.length / (length ?? 1);
        return this.success(decimals ? number : number % 1 ? Math.floor(number) + 1 : number);
    },
});
//# sourceMappingURL=getLeaderboardLength.js.map