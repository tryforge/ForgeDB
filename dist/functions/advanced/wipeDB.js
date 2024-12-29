"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$wipeDB",
    version: "1.0.0",
    aliases: ["$deleteDB", "$clearDB"],
    description: "Whipes all the data stored in the database including cooldowns",
    output: forgescript_1.ArgType.Json,
    unwrap: false,
    async execute(_ctx) {
        await util_1.DataBase.wipe();
        await util_1.DataBase.cdWipe();
        return this.success();
    },
});
//# sourceMappingURL=wipeDB.js.map