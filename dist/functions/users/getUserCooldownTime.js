"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms for a user",
    output: forgescript_1.ArgType.Number,
    brackets: false,
    unwrap: true,
    args: [
        {
            name: "user ID",
            description: "The user id to get its cooldown",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        }
    ],
    async execute(ctx, [id]) {
        return this.success(await database_1.DataBase.cdTimeLeft(`${ctx.cmd?.name}_${id?.id ?? ctx.user?.id}_user`));
    },
});
//# sourceMappingURL=getUserCooldownTime.js.map