"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeDB = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("./util");
const structures_1 = require("./structures");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
class ForgeDB extends forgescript_1.ForgeExtension {
    options;
    static defaults;
    name = "ForgeDB";
    description = "A fast and reliable database extension for Forge";
    version = "2.0.0";
    commands;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    constructor(options) {
        super();
        this.options = options;
    }
    init(client) {
        this.commands = new structures_1.DBCommandManager(client);
        forgescript_1.EventManager.load('ForgeDBEvents', __dirname + '/events');
        this.load(__dirname + "/functions");
        new util_1.DataBase(this.emitter, this.options).init();
        client.db = util_1.DataBase;
        if (this.options?.events?.length)
            client.events.load("ForgeDBEvents", this.options.events);
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