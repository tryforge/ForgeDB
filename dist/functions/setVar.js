"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../database");
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
        }, {
            name: "id",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: database_1.DataType,
            required: true,
        }, {
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type, value]) {
        if (database_1.DataType[type] == 'member' && id.split('_').length != 2)
            return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        await database_1.DataBase.set({ name, id, value, type: database_1.DataType[type] });
        return this.success();
    },
});
//# sourceMappingURL=setVar.js.map