"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const types_1 = require("./types");
require("reflect-metadata");
const databaseManager_1 = require("./databaseManager");
function isGuildData(data) {
    return ['member', 'channel', 'role'].includes(data.type);
}
class DataBase extends databaseManager_1.DataBaseManager {
    emitter;
    database = "forge.db";
    entityManager = {
        entities: [types_1.Record, types_1.Cooldown],
        mongoEntities: [types_1.MongoRecord, types_1.MongoCooldown]
    };
    db;
    static type;
    static db;
    static emitter;
    static entities;
    constructor(emitter, options) {
        super(options);
        this.emitter = emitter;
        this.db = this.getDB();
        this.init();
        DataBase.entities = {
            record: this.type == 'mongodb' ? types_1.MongoRecord : types_1.Record,
            cd: this.type == 'mongodb' ? types_1.MongoCooldown : types_1.Cooldown
        };
        DataBase.type = this.type;
    }
    async init() {
        (await this.db).initialize();
        DataBase.emitter = this.emitter;
        DataBase.db = await this.db;
        DataBase.emitter.emit("connect");
    }
    static make_intetifier(data) {
        return `${data.type}_${data.name}_${isGuildData(data) ? data.guildId + '_' : ''}${data.id}`;
    }
    static async set(data) {
        const newData = new this.entities.record();
        newData.identifier = this.make_intetifier(data);
        newData.name = data.name;
        newData.id = data.id;
        newData.type = data.type;
        newData.value = data.value;
        if (isGuildData(data))
            newData.guildId = data.guildId;
        const oldData = await this.db.getRepository(this.entities.record).findOneBy({ identifier: this.make_intetifier(data) });
        if (oldData && this.type == 'mongodb') {
            this.emitter.emit("variableUpdate", { newData, oldData });
            this.db.getRepository(this.entities.record).update(oldData, newData);
        }
        else {
            oldData ? this.emitter.emit("variableUpdate", { newData, oldData }) : this.emitter.emit('variableCreate', { data: newData });
            await this.db.getRepository(this.entities.record).save(newData);
        }
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
            where: { ...data }
        });
    }
    static async delete(data) {
        const identifier = data.identifier ?? this.make_intetifier(data);
        this.emitter.emit('variableDelete', { data: await this.db.getRepository(this.entities.record).findOneBy({ identifier }) });
        return await this.db.getRepository(this.entities.record).delete({ identifier });
    }
    static async wipe() {
        return await this.db.getRepository(this.entities.record).clear();
    }
    static async cdWipe() {
        return await this.db.getRepository(this.entities.cd).clear();
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
        const oldCD = await this.db.getRepository(this.entities.cd).findOneBy({ identifier: this.make_cdIdentifier(data) });
        if (oldCD && this.type == 'mongodb')
            return await this.db.getRepository(this.entities.cd).update(oldCD, cd);
        else
            return await this.db.getRepository(this.entities.cd).save(cd);
    }
    static async cdDelete(identifier) {
        await this.db.getRepository(this.entities.cd).delete({ identifier });
    }
    static async cdTimeLeft(identifier) {
        const data = await this.db.getRepository(this.entities.cd).findOneBy({ identifier });
        return data ? { ...data, left: Math.max(data.duration - (Date.now() - data.startedAt), 0) } : { left: 0 };
    }
    static async query(query) {
        return await this.db.query(query);
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map