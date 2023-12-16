"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortType = void 0;
const forgescript_1 = require("forgescript");
const __1 = require("..");
var SortType;
(function (SortType) {
    SortType[SortType["asc"] = 0] = "asc";
    SortType[SortType["desc"] = 1] = "desc";
})(SortType || (exports.SortType = SortType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$getLeaderboardValue",
    description: "Returns the position of a value in the leaderboard of a variable",
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
            name: "id",
            description: "The identifier of the value (of a user, guild, channel, message, etc)",
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
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type]) {
        const data = await __1.ForgeDB.allWithType(name);
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value));
        const index = ([SortType[0], SortType.asc].indexOf(type ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === id);
        return this.success(index + 1);
    },
});
//# sourceMappingURL=getLeaderboardValue.js.map