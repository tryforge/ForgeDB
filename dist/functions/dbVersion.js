"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$dbVersion",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute() {
        return this.success(require("../../package.json").version);
    },
});
//# sourceMappingURL=dbVersion.js.map