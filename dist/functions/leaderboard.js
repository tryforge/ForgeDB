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
    name: "$leaderboard",
    description: "Creates a leaderboard of identifiers in a variable",
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
            name: "envValue",
            description: "The variable name to use for $env, retrieve the id with $env[<name>;id] and the value with $env[<name>;value]",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name to use for $env, retrieve the position with $env[<name>]",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "code",
            description: "Code to execute for each row, remember to use $return",
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
    ],
    brackets: true,
    async execute(ctx) {
        const [type, valueVariable, positionVariable, code, sortType, max, page, separator] = this.data.fields;
        const typeExec = (await this["resolveCode"](ctx, type));
        if (!this["isValidReturnType"](typeExec))
            return typeExec;
        const valueVariableName = (await this["resolveCode"](ctx, valueVariable));
        if (!this["isValidReturnType"](valueVariableName))
            return valueVariableName;
        const positionVariableName = (await this["resolveCode"](ctx, positionVariable));
        if (!this["isValidReturnType"](positionVariableName))
            return positionVariableName;
        const sortTypeValue = (await this["resolveCode"](ctx, sortType));
        if (!this["isValidReturnType"](sortTypeValue))
            return sortTypeValue;
        const limitExec = (await this["resolveCode"](ctx, max));
        if (!this["isValidReturnType"](limitExec))
            return limitExec;
        const pageExec = (await this["resolveCode"](ctx, page));
        if (!this["isValidReturnType"](pageExec))
            return pageExec;
        const sepExec = (await this["resolveCode"](ctx, separator));
        if (!this["isValidReturnType"](sepExec))
            return sepExec;
        const varType = typeExec.value;
        const pos = positionVariableName.value;
        const valueName = valueVariableName.value;
        const sort = sortTypeValue.value === "desc" ? SortType.asc : SortType.desc;
        const limit = Number(limitExec.value) || 10;
        const pag = Number(pageExec.value) || 1;
        const sep = sepExec.value || "\n";
        const elements = new Array();
        const rows = await __1.ForgeDB.allWithType(varType)
            .then((x) => x.sort((x, y) => (sort === SortType.asc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit));
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1;
            const row = rows[i];
            ctx.setEnvironmentKey(pos, index);
            ctx.setEnvironmentKey(valueName, row);
            const execution = (await this["resolveCode"](ctx, code));
            if (!execution.return && !this["isValidReturnType"](execution))
                return execution;
            else if (execution.return)
                elements.push(execution.value);
        }
        return this.success(elements.join(sep));
    },
});
//# sourceMappingURL=leaderboard.js.map