"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getCooldownTime",
    version: "1.0.0",
    description: "Retrieves current cooldown time in ms for given id",
    output: forgescript_1.ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The id to get its cooldown",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
    ],
    async execute(_ctx, [id]) {
        return this.success(await __1.ForgeDB.cdTimeLeft(id));
    },
});
//# sourceMappingURL=getCooldownTime.js.map