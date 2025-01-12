import { DataSource, EntitySchema, MixedList } from "typeorm";
import { IDataBaseOptions } from "./types";
import 'reflect-metadata';

const activeDataBases: {name: string, db: DataSource}[] = [];

export abstract class DataBaseManager {
    public abstract database: string;
    public abstract entityManager: {
        entities: MixedList<Function | string | EntitySchema>;
        mongoEntities: MixedList<Function | string | EntitySchema>;
    }

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
                    entities: this.entityManager.entities,
                    synchronize: true
                });
            break;
            case "mongodb":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.mongoEntities,
                    synchronize: true
                });
            break;
            default:
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
                });
        }
        await db.initialize()
        activeDataBases.push({name: this.database, db})
        return db;
    }
};