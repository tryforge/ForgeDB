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
    name: "$channelLeaderboard",
    version: "2.0.0",
    description: "Creates a leaderboard specific to channels based on a variable.",
    output: forgescript_1.ArgType.String,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable used to create the leaderboard.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "guild ID",
            description: "The unique identifier of the guild for which you want to retrieve channel variables.",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        },
        {
            name: "sort type",
            description: "The sorting order for the leaderboard, either ascending (asc) or descending (desc).",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: SortType,
        },
        {
            name: "max",
            description: "The maximum number of entries to display per page on the leaderboard.",
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "page",
            description: "The specific page number of the leaderboard you wish to view.",
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "separator",
            description: "The separator to be utilized between each row in the leaderboard.",
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "envValue",
            description: "The variable name to employ for $env, facilitating the retrieval of identifiers and values using $env[<name>;id] and $env[<name>;value] respectively.",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name utilized for $env to acquire the position using $env[<name>].",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "code",
            description: "Code executed for each row, remembering to utilize $return to get results.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        }
    ],
    async execute(ctx, [name, guild, sortType, max, page, separator, valueVariable, positionVariable]) {
        const limit = max || 10;
        const pag = page || 1;
        const [, , , , , , , , code] = this.data.fields;
        const elements = new Array();
        const rows = await util_1.DataBase.find({ name, type: 'channel', guildId: guild?.id ?? ctx.guild.id })
            .then((x) => x.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit));
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1;
            const row = rows[i];
            const channel_name = ctx.client.guilds.cache.get(guild?.id ?? ctx.guild.id)?.channels.cache.get(row.id)?.name;
            const info = { channel_name, ...row };
            ctx.setEnvironmentKey(positionVariable || '', index);
            ctx.setEnvironmentKey(valueVariable || '', info);
            if (!code)
                elements.push(`${index}. ${channel_name} ~ ${row.value}`);
            const execution = (await this["resolveCode"](ctx, code));
            if (execution.value)
                elements.push(execution.value);
        }
        return this.success(elements.join(separator || '\n'));
    },
});
//# sourceMappingURL=channelLeaderboard.js.map