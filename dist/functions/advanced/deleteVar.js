"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteVar",
    version: "2.0.0",
    description: "Deletes a value from a variable",
    unwrap: true,
    brackets: true,
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
        }
    ],
    async execute(_ctx, [name, id, type]) {
        if (database_1.DataType[type] == 'member' && id.split('_').length != 2)
            return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        if (database_1.DataType[type] == 'channel' && id.split('_').length != 2)
            return this.error(Error('The `id` field with the type `channel` must follow this format: `channelID_guildID`'));
        await database_1.DataBase.delete({ name, id, type: database_1.DataType[type] });
        return this.success();
    },
});
//# sourceMappingURL=deleteVar.js.map