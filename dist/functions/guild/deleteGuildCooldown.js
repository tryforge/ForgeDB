"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteGuildCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given guild",
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild's id you want to delete the cooldown",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        database_1.DataBase.cdDelete(`${ctx.cmd?.name}_${id?.id ?? ctx.guild?.id}_guild`);
        return this.success();
    },
});
//# sourceMappingURL=deleteGuildCooldown.js.map