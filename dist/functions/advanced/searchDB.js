"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableType = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
var VariableType;
(function (VariableType) {
    VariableType[VariableType["user"] = 0] = "user";
    VariableType[VariableType["channel"] = 1] = "channel";
    VariableType[VariableType["role"] = 2] = "role";
    VariableType[VariableType["message"] = 3] = "message";
    VariableType[VariableType["member"] = 4] = "member";
    VariableType[VariableType["custom"] = 5] = "custom";
    VariableType[VariableType["guild"] = 6] = "guild";
})(VariableType || (exports.VariableType = VariableType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$searchDB",
    version: "2.0.0",
    description: "Returns a variable's value of a channel",
    output: forgescript_1.ArgType.Unknown,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "id",
            description: "The id of a user, guild, channel, etc.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "type",
            description: "The type of the variable",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: VariableType,
            required: false,
        },
        {
            name: "value",
            description: "The value of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild ID of a member, channel or role",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type, value, guild]) {
        const search = {
            name: name ? name : undefined,
            id: id ? id : undefined,
            //@ts-ignore
            type: VariableType[type]?.toString(),
            value: value ? value : undefined,
            guildId: guild?.id
        };
        return this.successJSON(await util_1.DataBase.find({ ...search }));
    }
});
//# sourceMappingURL=searchDB.js.map