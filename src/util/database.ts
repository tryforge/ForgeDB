import { Cooldown, GuildData, IDataBaseOptions, MongoCooldown, MongoRecord, MySQLRecord, PostgreSQLRecord, RecordData, SQLiteRecord } from "./types"
import { DataSource } from "typeorm"
import { TypedEmitter } from "tiny-typed-emitter"
import { IDBEvents } from "../structures"
import { TransformEvents } from ".."
import "reflect-metadata"
import { DataBaseManager } from "./databaseManager"

function isGuildData(data: RecordData): data is GuildData {
    return ["member", "channel", "role"].includes(data.type!)
}

type AnyRecord = typeof SQLiteRecord | typeof MongoRecord | typeof MySQLRecord | typeof PostgreSQLRecord
type AnyCooldown = typeof MongoCooldown | typeof Cooldown
export class DataBase extends DataBaseManager {
    public database = "forge.db"
    public entityManager = {
        sqlite: [SQLiteRecord, Cooldown],
        mongodb: [MongoRecord, MongoCooldown],
        mysql: [MySQLRecord, Cooldown],
        postgres: [PostgreSQLRecord, Cooldown],
    }
    private static entities: {
        Record: typeof SQLiteRecord | typeof MySQLRecord | typeof PostgreSQLRecord | typeof MongoRecord
        Cooldown: typeof Cooldown | typeof MongoCooldown
    }

    private db: Promise<DataSource>
    private static db: DataSource
    private static emitter: TypedEmitter<TransformEvents<IDBEvents>>

    constructor(
        private emitter: TypedEmitter<TransformEvents<IDBEvents>>,
        options?: IDataBaseOptions
    ) {
        super(options ?? {type: "sqlite"})
        this.type = options?.type  || "sqlite"
        this.db = this.getDB()
        DataBase.entities = {
            Record: this.entityManager[this.type == "better-sqlite3" ? "sqlite" : this.type][0] as AnyRecord,
            Cooldown: this.entityManager[this.type == "better-sqlite3" ? "sqlite" : this.type][1] as AnyCooldown,
        }
    }

    public async init() {
        DataBase.emitter = this.emitter
        DataBase.db = await this.db
        DataBase.emitter.emit("connect")
    }

    public static make_intetifier(data: RecordData) {
        return `${data.type}_${data.name}_${isGuildData(data) ? data.guildId + "_" : ""}${data.id}`
    }

    public static async set(data: RecordData) {
        const newData = new this.entities.Record()
        newData.identifier = this.make_intetifier(data)
        newData.name = data.name!
        newData.id = data.id!
        newData.type = data.type!
        newData.value = data.value!
        if (isGuildData(data)) newData.guildId = data.guildId
        const oldData = (await this.db.getRepository(this.entities.Record).findOneBy({ identifier: this.make_intetifier(data) })) as SQLiteRecord
        if (oldData && this.type == "mongodb") {
            this.emitter.emit("variableUpdate", { newData, oldData })
            this.db.getRepository(this.entities.Record).update(oldData, newData)
        } else {
            oldData ? this.emitter.emit("variableUpdate", { newData, oldData }) : this.emitter.emit("variableCreate", { data: newData })
            await this.db.getRepository(this.entities.Record).save(newData)
        }
    }

    public static async get(data: RecordData) {
        const identifier = data.identifier ?? this.make_intetifier(data)
        return await this.db.getRepository(this.entities.Record).findOneBy({ identifier })
    }

    public static async getAll() {
        return await this.db.getRepository(this.entities.Record).find()
    }

    public static async find(data?: RecordData) {
        return await this.db.getRepository(this.entities.Record).find({
            where: { ...data },
        })
    }

    public static async delete(data: RecordData) {
        const identifier = data.identifier ?? this.make_intetifier(data)
        this.emitter.emit("variableDelete", { data: (await this.db.getRepository(this.entities.Record).findOneBy({ identifier })) as SQLiteRecord })
        return await this.db.getRepository(this.entities.Record).delete({ identifier })
    }

    public static async wipe() {
        return await this.db.getRepository(this.entities.Record).clear()
    }

    public static async cdWipe() {
        return await this.db.getRepository(this.entities.Cooldown).clear()
    }

    public static make_cdIdentifier(data: { name?: string; id?: string }) {
        return `${data.name}${data.id ? "_" + data.id : ""}`
    }

    public static async cdAdd(data: { name: string; id?: string; duration: number }) {
        const cd = new this.entities.Cooldown()
        cd.identifier = this.make_cdIdentifier(data)
        cd.name = data.name
        cd.id = data.id
        cd.startedAt = Date.now()
        cd.duration = data.duration

        const oldCD = await this.db.getRepository(this.entities.Cooldown).findOneBy({ identifier: this.make_cdIdentifier(data) })
        if (oldCD && this.type == "mongodb") return await this.db.getRepository(this.entities.Cooldown).update(oldCD, cd)
        else return await this.db.getRepository(this.entities.Cooldown).save(cd)
    }

    public static async cdDelete(identifier: string) {
        await this.db.getRepository(this.entities.Cooldown).delete({ identifier })
    }

    public static async cdTimeLeft(identifier: string) {
        const data = await this.db.getRepository(this.entities.Cooldown).findOneBy({ identifier })
        return data ? { ...data, left: Math.max(data.duration - (Date.now() - data.startedAt), 0) } : { left: 0 }
    }

    public static async query(query: string) {
        return await this.db.query(query)
    }
}
