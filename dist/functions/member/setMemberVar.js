"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$setMemberVar",
    version: "2.0.0",
    description: "Sets an member's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        }, {
            name: "member ID",
            description: "The member id of the variable",
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
    brackets: true,
    async execute(ctx, [name, value, member, guild]) {
        await util_1.DataBase.set({ name, id: member?.id ?? ctx.member.id, value, type: "member", guildId: guild?.id ?? ctx.guild.id });
        return this.success();
    },
});
//# sourceMappingURL=setMemberVar.js.map