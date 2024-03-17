"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeDB = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("./database");
class ForgeDB extends forgescript_1.ForgeExtension {
    path;
    static defaults;
    name = "ForgeDB";
    description = "A fast and reliable database extension for Forge";
    version = "1.0.0";
    constructor(path = "./forge.db") {
        super();
        this.path = path;
    }
    init(client) {
        this.load(__dirname + "/functions");
        client.db = new database_1.DataBase();
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