"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteMemberCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given member",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you want the cooldown to get deleted",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "member ID",
            description: "The member's id you want to delete the cooldown",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, id, guild]) {
        util_1.DataBase.cdDelete(util_1.DataBase.make_cdIdentifier({ name: `${name}-${guild?.id ?? ctx.guild?.id}`, id: id?.id ?? ctx.member?.id }));
        return this.success();
    },
});
//# sourceMappingURL=deleteMemberCooldown.js.map