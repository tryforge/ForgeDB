"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$setGuildVar",
    version: "2.0.0",
    description: "Sets an identifier's value in a variable",
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
        }, {
            name: "guild ID",
            description: "The guild id of the variable",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, value, guild]) {
        await database_1.DataBase.set({ name, id: guild?.id ?? ctx.guild.id, value, type: "guild" });
        return this.success();
    },
});
//# sourceMappingURL=setGuildVar.js.map