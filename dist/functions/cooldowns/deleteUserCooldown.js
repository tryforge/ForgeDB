"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteUserCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given user",
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
            name: "user ID",
            description: "The user's id you want to delete the cooldown",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    async execute(ctx, [name, id]) {
        util_1.DataBase.cdDelete(util_1.DataBase.make_cdIdentifier({ name: name, id: id?.id ?? ctx.user?.id }));
        return this.success();
    },
});
//# sourceMappingURL=deleteUserCooldown.js.map