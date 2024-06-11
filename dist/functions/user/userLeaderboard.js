"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortType = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
var SortType;
(function (SortType) {
    SortType[SortType["asc"] = 0] = "asc";
    SortType[SortType["desc"] = 1] = "desc";
})(SortType || (exports.SortType = SortType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$userLeaderboard",
    version: "2.0.0",
    description: "Creates a user leaderboard for a variable",
    output: forgescript_1.ArgType.String,
    brackets: true,
    unwrap: false,
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
            description: "The sort type for the leaderboard, either asc (ascending) or desc (descending)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: SortType,
        },
        {
            name: "max",
            description: "The maximum number of rows per page",
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "page",
            description: "The page number",
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "separator",
            description: "The separator to use for each row",
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "envValue",
            description: "The variable name to use for $env. Retrieve the id with $env[<name>;id] and the value with $env[<name>;value]",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name to use for $env. Retrieve the position with $env[<name>]",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "code",
            description: "Code to execute for each row.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        }
    ],
    async execute(ctx) {
        const [name, sortType, max, page, separator, valueVariable, positionVariable, code] = this.data.fields;
        const limit = Number(max?.value) || 10;
        const pag = Number(page?.value) || 1;
        const nameV = (await this["resolveCode"](ctx, name));
        if (!this["isValidReturnType"](nameV))
            return nameV;
        const elements = new Array();
        const rows = await util_1.DataBase.find({ name: nameV.value, type: 'user' })
            .then((x) => x.sort((x, y) => (sortType?.value === "desc" ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit));
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1;
            const row = rows[i];
            const username = ctx.client.users.cache.get(row.id)?.username;
            const info = { username, ...row };
            ctx.setEnvironmentKey(positionVariable?.value || '', index);
            ctx.setEnvironmentKey(valueVariable?.value || '', info);
            if (!code)
                elements.push(`${index}. ${username} ~ ${row.value}`);
            const execution = (await this["resolveCode"](ctx, code));
            if (execution.value)
                elements.push(execution.value);
        }
        return this.success(elements.join(separator?.value || '\n'));
    },
});
//# sourceMappingURL=userLeaderboard.js.map