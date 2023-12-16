"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeDB = void 0;
const forgescript_1 = require("forgescript");
const quick_db_1 = require("quick.db");
class ForgeDB extends forgescript_1.ForgeExtension {
    path;
    static db;
    name = "ForgeDB";
    description = "A fast and reliable database extension for Forge";
    version = "1.0.0";
    constructor(path = "./forge.db") {
        super();
        this.path = path;
    }
    init(client) {
        forgescript_1.FunctionManager.load(__dirname + "/functions");
        ForgeDB.db = new quick_db_1.QuickDB({
            driver: new quick_db_1.SqliteDriver(this.path),
        });
        client.db = ForgeDB.db.table("main");
    }
    static makeIdentifier(type, id) {
        return `${type}_${id}`;
    }
    static get(type, id) {
        return this.db.get(this.makeIdentifier(type, id)) ?? {};
    }
    static set(type, id, value) {
        const identifier = this.makeIdentifier(type, id);
        return this.db.set(identifier, {
            identifier,
            id,
            type,
            value,
        });
    }
    static delete(type, id) {
        return this.db.delete(this.makeIdentifier(type, id));
    }
    static async allWithType(type) {
        return (await this.db.startsWith(type)).map((x) => x.value);
    }
    static async all(filter = () => true) {
        const all = await this.db.all();
        return all.map((x) => x.value).filter(filter);
    }
    static async deleteWithFilter(filter) {
        const all = await this.db.all();
        return Promise.all(all.filter((x) => filter(x.value)).map((x) => this.db.delete(x.id)));
    }
    static deleteAll() {
        return this.db.deleteAll();
    }
    static async cdAdd(id, duration) {
        await this.db.set(id, {
            startedAt: Date.now(),
            duration,
        });
    }
    static async cdDelete(id) {
        await this.db.delete(id);
    }
    static async cdTimeLeft(id) {
        const data = await this.db.get(id);
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0;
    }
}
exports.ForgeDB = ForgeDB;
//# sourceMappingURL=index.js.map