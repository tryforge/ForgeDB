"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteMessageVar",
    version: "2.0.0",
    description: "Deletes a value from a message variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "message ID",
            description: "The ID of the message",
            rest: false,
            type: forgescript_1.ArgType.Message,
            required: false,
        }
    ],
    async execute(ctx, [name, message]) {
        await util_1.DataBase.delete({ name, id: message?.id ?? ctx.message.id, type: "message" });
        return this.success();
    },
});
//# sourceMappingURL=deleteMessageVar.js.map