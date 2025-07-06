"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseManager = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const activeDataBases = [];
let config;
class DataBaseManager {
    type;
    static type;
    constructor(options) {
        if (!config && options) {
            options.type = options.type ?? "sqlite";
            config = options;
        }
    }
    async getDB() {
        await this.waitForConfig();
        this.type = config.type;
        DataBaseManager.type = this.type;
        const check = activeDataBases.find((s) => s.name == this.database);
        if (check?.name == this.database)
            return check.db;
        const data = { ...config };
        let db;
        switch (data.type) {
            case "mysql":
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.mysql,
                    synchronize: true,
                });
            case "postgres":
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.postgres,
                    synchronize: true,
                });
                break;
            case "mongodb":
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.mongodb,
                    synchronize: true,
                });
                break;
            default:
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.sqlite,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`,
                });
        }
        db = await db.initialize();
        activeDataBases.push({ name: this.database, db });
        return db;
    }
    async waitForConfig() {
        return new Promise((resolve) => {
            const check = setInterval(() => {
                if (config) {
                    clearInterval(check);
                    resolve(config);
                }
            }, 50);
            setTimeout(() => {
                clearInterval(check);
                if (!config)
                    throw new Error("Unable to resolve ForgeDB extension configuration. Dependent packages failed to initialize.");
            }, 10_000);
        });
    }
}
exports.DataBaseManager = DataBaseManager;
//# sourceMappingURL=databaseManager.js.map