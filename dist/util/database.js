"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
function isGuildData(data) {
    return ['member', 'channel', 'role'].includes(data.type);
}
class DataBase {
    db;
    static db;
    static entities;
    constructor(options) {
        const data = { ...options };
        data.type = data.type ?? 'sqlite';
        if (data.type != 'mongodb')
            data.database = data.database ?? 'forge.db';
        const config = { ...data };
        if (config.type == 'mongodb')
            Object.assign(config, { useUnifiedTopology: true });
        DataBase.entities = {
            record: data.type == 'mongodb' ? types_1.MongoRecord : types_1.Record,
            cd: data.type == 'mongodb' ? types_1.MongoCooldown : types_1.Cooldown
        };
        const db = new typeorm_1.DataSource({
            ...config,
            entities: [DataBase.entities.record, DataBase.entities.cd],
            synchronize: true
        });
        this.db = db.initialize();
    }
    async init() {
        DataBase.db = await this.db;
    }
    static make_intetifier(data) {
        return `${data.type}_${data.name}_${isGuildData(data) ? data.guildId + '_' : ''}${data.id}`;
    }
    static async set(data) {
        const newRecord = new this.entities.record();
        newRecord.identifier = this.make_intetifier(data);
        newRecord.name = data.name;
        newRecord.id = data.id;
        newRecord.type = data.type;
        newRecord.value = data.value;
        if (isGuildData(data))
            newRecord.guildId = data.guildId;
        return await this.db.getRepository(this.entities.record).save(newRecord);
    }
    static async get(data) {
        const identifier = data.identifier ?? this.make_intetifier(data);
        return await this.db.getRepository(this.entities.record).findOneBy({ identifier });
    }
    static async getAll() {
        return await this.db.getRepository(this.entities.record).find();
    }
    static async find(data) {
        return await this.db.getRepository(this.entities.record).find({
            where: {
                ...data
            }
        });
    }
    static async delete(data) {
        const identifier = data.identifier ?? this.make_intetifier(data);
        return await this.db.getRepository(this.entities.record).delete({ identifier });
    }
    static async wipe() {
        return await this.db.getRepository(this.entities.record).clear();
    }
    static make_cdIdentifier(data) {
        return `${data.name}${data.id ? '_' + data.id : ''}`;
    }
    static async cdAdd(data) {
        const cd = new this.entities.cd();
        cd.identifier = this.make_cdIdentifier(data);
        cd.name = data.name;
        cd.id = data.id;
        cd.startedAt = Date.now();
        cd.duration = data.duration;
        return this.db.getRepository(this.entities.cd).save(cd);
    }
    static async cdDelete(identifier) {
        await this.db.getRepository(this.entities.cd).delete({ identifier });
    }
    static async cdTimeLeft(identifier) {
        const data = await this.db.getRepository(this.entities.cd).findOneBy({ identifier });
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0;
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map