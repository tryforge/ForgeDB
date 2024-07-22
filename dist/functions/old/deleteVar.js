"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteVar",
    version: "1.0.0",
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
        },
        {
            name: "id",
            description: "The identifier of the value (a user, guild, channel, message, etc)",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
    ],
    async execute(_ctx, [name, id]) {
        await util_1.DataBase.delete({
            type: "old",
            id,
            name
        });
        return this.success();
    },
});
//# sourceMappingURL=deleteVar.js.map