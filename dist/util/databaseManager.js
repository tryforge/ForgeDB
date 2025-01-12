"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseManager = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const activeDataBases = [];
class DataBaseManager {
    type;
    static type;
    config;
    constructor(options) {
        if (options) {
            options.type = options.type ?? "sqlite";
            this.config = options;
        }
        else
            this.config = { type: "sqlite" };
        this.type = this.config.type;
        DataBaseManager.type = this.type;
    }
    async getDB() {
        const check = activeDataBases.find(s => s.name == this.database);
        if (check?.name == this.database)
            return check.db;
        const data = { ...this.config };
        let db;
        switch (data.type) {
            case "mysql":
            case "postgres":
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true
                });
                break;
            case "mongodb":
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.mongoEntities,
                    synchronize: true
                });
                break;
            default:
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
                });
        }
        await db.initialize();
        activeDataBases.push({ name: this.database, db });
        return db;
    }
}
exports.DataBaseManager = DataBaseManager;
;
//# sourceMappingURL=databaseManager.js.map