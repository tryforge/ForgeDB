"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeDB = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("./util");
class ForgeDB extends forgescript_1.ForgeExtension {
    options;
    static defaults;
    name = "ForgeDB";
    description = "A fast and reliable database extension for Forge";
    version = "2.0.0";
    constructor(options) {
        super();
        this.options = options;
    }
    init(client) {
        this.load(__dirname + "/functions");
        new util_1.DataBase(this.options).init();
        client.db = util_1.DataBase;
    }
    variables(rec) {
        ForgeDB.variables(rec);
    }
    static variables(rec) {
        ForgeDB.defaults = ForgeDB.compileVariables(rec);
    }
    static compileVariables(rec) {
        const obj = {};
        for (const [key, value] of Object.entries(rec)) {
            if (typeof value === "string") {
                obj[key] = forgescript_1.Compiler.compile(value);
            }
            else {
                obj[key] = value;
            }
        }
        return obj;
    }
}
exports.ForgeDB = ForgeDB;
//# sourceMappingURL=index.js.map