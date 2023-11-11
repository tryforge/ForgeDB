"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$setVar",
    description: "Sets an identifier's value in a variable",
    unwrap: true,
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
            description: "The identifier for the value (a user, guild, channel, message, etc)",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, value]) {
        await __1.ForgeDB.set(name, id, value);
        return forgescript_1.Return.success();
    },
});
//# sourceMappingURL=setVar.js.map