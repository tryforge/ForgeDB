"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getCooldownTime",
    description: "Retrieves current cooldown time in ms for given id",
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
    async execute(ctx, [id]) {
        return this.success(await __1.ForgeDB.cdTimeLeft(id));
    },
});
//# sourceMappingURL=getCooldownTime.js.map