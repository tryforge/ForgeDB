"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteUserCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given id",
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "user ID",
            description: "The user's id you want to delete the cooldown",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        database_1.DataBase.cdDelete(`${ctx.cmd?.name}_${id?.id ?? ctx.user?.id}_user`);
        return this.success();
    },
});
//# sourceMappingURL=deleteUserCooldown.js.map