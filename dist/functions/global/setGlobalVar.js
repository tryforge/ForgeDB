"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$setGuildVar",
    version: "2.0.0",
    description: "Sets a guild's value in a variable",
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
        }
    ],
    brackets: true,
    async execute(_ctx, [name, value]) {
        await util_1.DataBase.set({ name, value, type: "custom" });
        return this.success();
    },
});
//# sourceMappingURL=setGlobalVar.js.map