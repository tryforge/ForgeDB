"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortType = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
var SortType;
(function (SortType) {
    SortType[SortType["asc"] = 0] = "asc";
    SortType[SortType["desc"] = 1] = "desc";
})(SortType || (exports.SortType = SortType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$getMemberLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a member in the leaderboard of a variable",
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
            name: "sort type",
            description: "The sort type for the leaderboard, either asc/0 (ascending) or desc/1 (descending)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: SortType,
        }, {
            name: "guild ID",
            description: "The guild id where the member belongs to",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false
        }, {
            name: "member ID",
            description: "The member id of the variable",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, guild, user]) {
        const data = await database_1.DataBase.allWithType(`${name}_${guild?.id ?? ctx.guild?.id}`, "member");
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value));
        const index = ([SortType[0], SortType.asc].indexOf(sortType ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === (user?.id ?? ctx.user?.id));
        return this.success(index + 1);
    },
});
//# sourceMappingURL=getMemberLeaderboardValue.js.map