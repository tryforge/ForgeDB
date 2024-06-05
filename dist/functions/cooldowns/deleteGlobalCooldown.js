"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteGlobalCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown of a given global",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command you want the cooldown to get deleted",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }
    ],
    async execute(_ctx, [name]) {
        util_1.DataBase.cdDelete(util_1.DataBase.make_cdIdentifier({ name }));
        return this.success();
    },
});
//# sourceMappingURL=deleteGlobalCooldown.js.map