"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
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
            enum: util_1.DataType,
            required: true,
        },
    ],
    brackets: true,
    async execute(ctx, [type]) {
        //@ts-ignore
        return this.success(ctx.runtime.extras.oldData[util_1.DataType[type].toString()]);
    },
});
//# sourceMappingURL=oldData.js.map