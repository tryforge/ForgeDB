"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseManager = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
class DataBaseManager {
    type;
    config;
    activeDataBases;
    constructor(options) {
        if (options)
            options.type = options.type ?? "sqlite";
        this.config = options ?? { type: "sqlite" };
        this.type = this.config.type;
    }
    async getDB() {
        if (!this.activeDataBases)
            this.activeDataBases = [];
        const check = this.activeDataBases.find(s => s.name == "");
        if (check?.name == this.database)
            return check.db;
        const data = { ...this.config };
        switch (data.type) {
            case "mysql":
            case "postgres":
                data.database = this.database;
                return new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true
                });
            case "mongodb":
                return new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.mongoEntities,
                    synchronize: true
                });
            default:
                return new typeorm_1.DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
                });
        }
    }
}
exports.DataBaseManager = DataBaseManager;
;
//# sourceMappingURL=databaseManager.js.map