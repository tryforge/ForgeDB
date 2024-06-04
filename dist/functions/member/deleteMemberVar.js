"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteMemberVar",
    version: "2.0.0",
    description: "Deletes a value from a member variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "member ID",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        }, {
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, member, guild]) {
        await util_1.DataBase.delete({ name, id: member?.id ?? ctx.member.id, type: "member", guildId: guild?.id ?? ctx.guild.id });
        return this.success();
    },
});
//# sourceMappingURL=deleteMemberVar.js.map