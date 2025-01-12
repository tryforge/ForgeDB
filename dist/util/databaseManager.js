"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseManager = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const types_1 = require("./types");
const activeDataBases = [];
class DataBaseManager {
    type;
    config;
    constructor(options) {
        if (options) {
            options.type = options.type ?? "sqlite";
            this.config = options;
        }
        else
            this.config = { type: "sqlite" };
        this.type = this.config.type;
    }
    wrapEntitiesForMongo() {
        //@ts-ignore
        this.activeEntities = this.activeEntities.map(s => {
            const mongoEntity = class extends s {
                constructor(...args) {
                    super(...args);
                    Object.assign(this, new types_1.MongoClasses());
                }
            };
            Object.defineProperty(mongoEntity, "name", { value: s.name });
            return mongoEntity;
        });
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
                data.database = this.database;
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.activeEntities,
                    synchronize: true
                });
                break;
            case "mongodb":
                this.wrapEntitiesForMongo();
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.activeEntities,
                    synchronize: true
                });
                break;
            default:
                db = new typeorm_1.DataSource({
                    ...data,
                    entities: this.activeEntities,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
                });
        }
        await db.initialize();
        activeDataBases.push({ name: this.database, db });
        return db;
    }
    get entities() {
        const entitiesJson = {};
        //@ts-ignore
        this.activeEntities.forEach(entity => {
            const className = entity.name;
            entitiesJson[className] = entity;
        });
        return entitiesJson;
    }
    ;
    static get entities() {
        const entitiesJson = {};
        //@ts-ignore
        this.activeEntities.forEach(entity => {
            const className = entity.name;
            entitiesJson[className] = entity;
        });
        return entitiesJson;
    }
    ;
}
exports.DataBaseManager = DataBaseManager;
;
//# sourceMappingURL=databaseManager.js.map