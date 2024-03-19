"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$getCooldownTime",
    version: "2.0.0",
    description: "Retrieves current cooldown time in ms of a command",
    output: forgescript_1.ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "id",
            description: "The id to get its cooldown",
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
        return this.success(await database_1.DataBase.cdTimeLeft(`${name}_${id}_${database_1.DataType[type]}`));
    },
});
//# sourceMappingURL=getCooldownTime.js.map