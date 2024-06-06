import { Cooldown, GuildData, IDataBaseOptions, MongoCooldown, MongoRecord, Record, RecordData } from './types';
import { DataSource, DataSourceOptions } from "typeorm";
import { TypedEmitter } from 'tiny-typed-emitter';
import { IDBEvents } from '../structures';
import { TransformEvents } from '..';
import 'reflect-metadata';

function isGuildData(data: RecordData): data is GuildData {
    return ['member', 'channel', 'role'].includes(data.type!);
}

export class DataBase {
    private db: Promise<DataSource>;
    private static db: DataSource;
    private static emitter: TypedEmitter<TransformEvents<IDBEvents>>;
    private static entities: {
        record: typeof Record | typeof MongoRecord
        cd: typeof Cooldown | typeof MongoCooldown
    }
    
    constructor(emitter: TypedEmitter<TransformEvents<IDBEvents>>,options?: IDataBaseOptions) {
        const data = {...options}
        data.type = data.type ?? 'sqlite'
        if(data.type != 'mongodb') data.database = data.database ?? 'forge.db'
        
        const config = {...data} as DataSourceOptions
        if(config.type == 'mongodb') Object.assign(config, {useUnifiedTopology: true})

        DataBase.entities = {
            record: data.type == 'mongodb' ? MongoRecord : Record,
            cd: data.type == 'mongodb' ? MongoCooldown : Cooldown
        }
        DataBase.emitter = emitter
        
        const db = new DataSource({
            ...config,
            entities: [ DataBase.entities.record, DataBase.entities.cd ],
            synchronize: true
        });
        this.db = db.initialize()
    }

    public async init() {
        DataBase.db = await this.db
        DataBase.emitter.emit("connect")
    }

    public static make_intetifier(data: RecordData) {
        return `${data.type}_${data.name}_${isGuildData(data) ? data.guildId+'_' : ''}${data.id}`
    }

    public static async set(data: RecordData) {
        const newData = new this.entities.record()
        newData.identifier = this.make_intetifier(data)
        newData.name = data.name!
        newData.id = data.id!
        newData.type = data.type!
        newData.value = data.value!
        if(isGuildData(data)) newData.guildId = data.guildId;
        const oldData = await this.db.getRepository(this.entities.record).findOneBy({ identifier: this.make_intetifier(data) })
        
        return await this.db.getRepository(this.entities.record).save(newData)
        .then(() => oldData ? this.emitter.emit("variableUpdate", { newData, oldData }) : this.emitter.emit('variableCreate', { data: newData }))
    }

    public static async get(data: RecordData) {
        const identifier = data.identifier ?? this.make_intetifier(data)
        return await this.db.getRepository(this.entities.record).findOneBy({ identifier })
    }

    public static async getAll(){
        return await this.db.getRepository(this.entities.record).find()
    }

    public static async find(data?: RecordData){
        return await this.db.getRepository(this.entities.record).find({
            where: {
                ...data
            }
        })
    }

    public static async delete(data: RecordData) {
        const identifier = data.identifier ?? this.make_intetifier(data)
        this.emitter.emit('variableDelete', { data: await this.db.getRepository(this.entities.record).findOneBy({ identifier }) })
        return await this.db.getRepository(this.entities.record).delete({ identifier })
    }

    public static async wipe() {
        return await this.db.getRepository(this.entities.record).clear()
    }

    public static make_cdIdentifier(data: {name?: string, id?: string}){
        return `${data.name}${data.id ? '_'+data.id : ''}`
    }

    public static async cdAdd(data: {name: string, id?: string, duration: number}){
        const cd = new this.entities.cd()
        cd.identifier = this.make_cdIdentifier(data)
        cd.name = data.name
        cd.id = data.id
        cd.startedAt = Date.now()
        cd.duration = data.duration

        return this.db.getRepository(this.entities.cd).save(cd)
    }

    public static async cdDelete(identifier: string) {
        await this.db.getRepository(this.entities.cd).delete({identifier})
    }

    public static async cdTimeLeft(identifier: string) {
        const data = await this.db.getRepository(this.entities.cd).findOneBy({ identifier })
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0
    }
}