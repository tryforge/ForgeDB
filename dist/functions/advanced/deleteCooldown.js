"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteCooldown",
    version: "2.0.0",
    description: "Deletes a cooldown",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the command",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "id",
            description: "The cooldown id you want to delete",
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
        database_1.DataBase.cdDelete(`${name}_${id}_${database_1.DataType[type]}`);
        return this.success();
    },
});
//# sourceMappingURL=deleteCooldown.js.map