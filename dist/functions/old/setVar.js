"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$setVar",
    version: "1.0.0",
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
        await util_1.DataBase.set({
            value,
            name,
            type: "old",
            id
        });
        return this.success();
    },
});
//# sourceMappingURL=setVar.js.map