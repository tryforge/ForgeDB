"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getDB",
    version: "1.0.0",
    description: "Returns all the identifiers stored in the DB",
    output: forgescript_1.ArgType.Json,
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await util_1.DataBase.getAll());
    },
});
//# sourceMappingURL=getDB.js.map