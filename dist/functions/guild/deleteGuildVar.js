"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteGuildVar",
    version: "2.0.0",
    description: "Removes a value from a guild variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable from which to remove the value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "guild ID",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx, [name, guild]) {
        await util_1.DataBase.delete({ name, id: guild?.id ?? ctx.guild.id, type: "guild" });
        return this.success();
    },
});
//# sourceMappingURL=deleteGuildVar.js.map