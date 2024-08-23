"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteMemberVar",
    version: "2.0.0",
    description: "Removes a value from a member variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable from which to remove the value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "member ID",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild to which the member belongs",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        }
    ],
    async execute(ctx, [name, member, guild]) {
        await util_1.DataBase.delete({ name, id: member ?? ctx.member.id, type: "member", guildId: guild ?? ctx.guild.id });
        return this.success();
    },
});
//# sourceMappingURL=deleteMemberVar.js.map