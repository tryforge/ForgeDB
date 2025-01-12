import { DataSource, EntitySchema, MixedList } from "typeorm";
import 'reflect-metadata';
import { IDataBaseOptions, MongoClasses } from "./types";

const activeDataBases: {name: string, db: DataSource}[] = [];

export abstract class DataBaseManager {
    public abstract database: string;
    public abstract activeEntities: MixedList<Function | string | EntitySchema>;

    public type: IDataBaseOptions['type'];
    private config: IDataBaseOptions

    constructor(options?: IDataBaseOptions){
        if(options){
            options.type = options.type ?? "sqlite"
            this.config = options
        }
        else this.config = { type: "sqlite" };
        this.type = this.config.type
    }

    private wrapEntitiesForMongo() {
        //@ts-ignore
        this.activeEntities = this.activeEntities.map(s => {
            const mongoEntity = class extends s {
                constructor(...args: any[]){
                    super(...args);
                    Object.assign(this, new MongoClasses())
                }
            }
            Object.defineProperty(mongoEntity, "name", { value: s.name });
            return mongoEntity
        })
    }

    protected async getDB(){
        const check = activeDataBases.find(s => s.name == this.database)
        if(check?.name == this.database) return check.db;
        const data: IDataBaseOptions = {...this.config}
        let db;
        switch (data.type){
            case "mysql":
            case "postgres":
                db = new DataSource({
                    ...data,
                    entities: this.activeEntities,
                    synchronize: true
                });
            break;
            case "mongodb":
                this.wrapEntitiesForMongo()
                db = new DataSource({
                    ...data,
                    entities: this.activeEntities,
                    synchronize: true
                });
            break;
            default:
                db = new DataSource({
                    ...data,
                    entities: this.activeEntities,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
                });
        }
        await db.initialize()
        activeDataBases.push({name: this.database, db})
        return db;
    }

    public get entities() {
        const entitiesJson: Record<string, EntitySchema | string | Function> = {};
        //@ts-ignore
        this.activeEntities.forEach(entity => {
            const className = entity.name;
            entitiesJson[className] = entity;
        });
        
        return entitiesJson;
    };

    public static get entities() {
        const entitiesJson: any = {};
        //@ts-ignore
        this.activeEntities.forEach(entity => {
            const className = entity.name;
            entitiesJson[className] = entity;
        });
        
        return entitiesJson;
    };
};