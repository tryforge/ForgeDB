"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$getGuildCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a guild",
    output: forgescript_1.ArgType.Number,
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild id to get its cooldown",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        return this.success(await database_1.DataBase.cdTimeLeft(`${ctx.cmd?.name}_${id?.id ?? ctx.guild?.id}_guild`));
    },
});
//# sourceMappingURL=getGuildCooldownTime.js.map