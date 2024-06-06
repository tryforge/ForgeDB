"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteRoleVar",
    version: "2.0.0",
    description: "Deletes a value from a role variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "role ID",
            description: "The ID of the role",
            rest: false,
            type: forgescript_1.ArgType.Role,
            required: true,
        }
    ],
    async execute(_ctx, [name, role]) {
        await util_1.DataBase.delete({ name, id: role?.id, type: "role", guildId: role.guild.id });
        return this.success();
    },
});
//# sourceMappingURL=deleteRoleVar.js.map