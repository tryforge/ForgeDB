"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$setGuildVar",
    version: "2.0.0",
    description: "Assigns a value to a variable associated with a guild",
    aliases: ["$setServerVar"],
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to set the value in",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value to be assigned",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "guild ID",
            description: "The guild ID for which to set the variable value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, guild]) {
        await util_1.DataBase.set({ name, id: guild ?? ctx.guild.id, value, type: "guild" });
        return this.success();
    },
});
//# sourceMappingURL=setGuildVar.js.map