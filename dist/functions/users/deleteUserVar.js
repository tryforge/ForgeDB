"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteUserVar",
    version: "2.0.0",
    description: "Deletes a value from a variable",
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
            name: "user ID",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.User,
            required: false,
        }
    ],
    async execute(ctx, [name, user]) {
        await database_1.DataBase.delete({ name, id: user?.id ?? ctx.user.id, type: "user" });
        return this.success();
    },
});
//# sourceMappingURL=deleteUserVar.js.map