"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$getDB",
    version: "1.0.0",
    description: "Returns all the identifiers stored in the DB",
    output: forgescript_1.ArgType.Json,
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await database_1.DataBase.all());
    },
});
//# sourceMappingURL=getDB.js.map