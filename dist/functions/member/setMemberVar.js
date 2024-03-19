"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$setMemberVar",
    version: "2.0.0",
    description: "Sets an identifier's value in a variable",
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
    brackets: true,
    async execute(ctx, [name, value, guild, member]) {
        await database_1.DataBase.set({ name: `${name}_${guild?.id ?? ctx.guild?.id}`, id: member?.id ?? ctx.member.id, value, type: "member" });
        return this.success();
    },
});
//# sourceMappingURL=setMemberVar.js.map