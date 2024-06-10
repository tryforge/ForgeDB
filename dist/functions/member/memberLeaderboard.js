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
    name: "$memberLeaderboard",
    version: "2.0.0",
    description: "Creates a leaderboard of members for a variable",
    output: forgescript_1.ArgType.String,
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the variable to create the leaderboard for",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "guild ID",
            description: "The guild ID for which to retrieve the variable of members",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        },
        {
            name: "sort type",
            description: "The sort order for the leaderboard, either ascending (asc) or descending (desc)",
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
            description: "The variable name to use for $env, retrieve the id with $env[<name>;id] and the value with $env[<name>;value]",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name to use for $env, retrieve the position with $env[<name>]",
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
        const [name, guild, sortType, max, page, separator, valueVariable, positionVariable, code] = this.data.fields;
        const limit = Number(max?.value) || 10;
        const pag = Number(page?.value) || 1;
        const guildID = (await this["resolveCode"](ctx, guild));
        if (!this["isValidReturnType"](guildID))
            return guildID;
        const elements = new Array();
        const rows = await util_1.DataBase.find({ name: name.value, type: 'member', guildId: guildID.value ?? ctx.guild.id })
            .then((x) => x.sort((x, y) => (sortType?.value === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit));
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1;
            const row = rows[i];
            const username = ctx.client.guilds.cache.get(guildID.value ?? ctx.guild.id)?.members.cache.get(row.id)?.user.username;
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
//# sourceMappingURL=memberLeaderboard.js.map