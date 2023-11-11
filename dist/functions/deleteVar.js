"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteVar",
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
    async execute(_ctx, [type, id]) {
        await __1.ForgeDB.delete(type, id);
        return forgescript_1.Return.success();
    },
});
//# sourceMappingURL=deleteVar.js.map