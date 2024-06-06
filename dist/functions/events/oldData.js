"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
const forgescript_1 = require("@tryforge/forgescript");
var DataType;
(function (DataType) {
    DataType[DataType["identifier"] = 0] = "identifier";
    DataType[DataType["name"] = 1] = "name";
    DataType[DataType["id"] = 2] = "id";
    DataType[DataType["type"] = 3] = "type";
    DataType[DataType["value"] = 4] = "value";
    DataType[DataType["guildId"] = 5] = "guildId";
})(DataType || (exports.DataType = DataType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$oldData",
    version: "2.0.0",
    description: "Retrieves the old data that has been updated for a record during an update event",
    unwrap: true,
    args: [
        {
            name: "type",
            description: "The type of data you want to retrieve",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: DataType,
            required: true,
        }
    ],
    brackets: true,
    async execute(ctx, [type]) {
        //@ts-ignore
        return this.success(ctx.runtime.extras.oldData[DataType[type].toString()]);
    },
});
//# sourceMappingURL=oldData.js.map