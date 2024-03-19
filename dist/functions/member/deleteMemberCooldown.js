"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteMemberCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given member",
    brackets: false,
    unwrap: true,
    args: [
        {
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
    async execute(ctx, [guild, id]) {
        database_1.DataBase.cdDelete(`${ctx.cmd?.name}_${guild?.id ?? ctx.guild?.id}_${id?.id ?? ctx.user?.id}_member`);
        return this.success();
    },
});
//# sourceMappingURL=deleteMemberCooldown.js.map