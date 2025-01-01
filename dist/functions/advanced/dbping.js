"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
const perf_hooks_1 = require("perf_hooks");
exports.default = new forgescript_1.NativeFunction({
    name: "$dbPing",
    aliases: ['$dbLatency'],
    version: '2.0.9',
    description: "Returns the database ping.",
    output: forgescript_1.ArgType.String,
    unwrap: true,
    brackets: false,
    args: [{
            name: "full",
            description: "This will return the max decimals",
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        }],
    async execute(_ctx, [full]) {
        const start = perf_hooks_1.performance.now();
        await util_1.DataBase.query("SELECT 1");
        const end = perf_hooks_1.performance.now();
        let res = end - start;
        if (!full)
            res = Number(res.toFixed(2));
        return this.success(res);
    },
});
//# sourceMappingURL=dbping.js.map