"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteCooldown",
    description: "Deletes cooldown of given id",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The id to delete its cooldown",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
    ],
    async execute(ctx, [id]) {
        __1.ForgeDB.cdDelete(id);
        return this.success();
    },
});
//# sourceMappingURL=deleteCooldown.js.map