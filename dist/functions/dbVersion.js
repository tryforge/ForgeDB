"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$dbVersion",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    output: forgescript_1.ArgType.Number,
    unwrap: false,
    execute() {
        return this.success(require("../../package.json").version);
    },
});
//# sourceMappingURL=dbVersion.js.map