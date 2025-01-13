import { DataSource, EntitySchema, MixedList } from "typeorm";
import { IDataBaseOptions } from "./types";
import 'reflect-metadata';

const activeDataBases: {name: string, db: DataSource}[] = [];

export abstract class DataBaseManager {
    public abstract database: string;
    public abstract entityManager: {
        sqlite: MixedList<Function | string | EntitySchema>;
        mongo: MixedList<Function | string | EntitySchema>;
        mysql: MixedList<Function | string | EntitySchema>;
        postgres: MixedList<Function | string | EntitySchema>;
    }

    public type: IDataBaseOptions['type'];
    public static type: IDataBaseOptions['type'];
    private config: IDataBaseOptions

    constructor(options?: IDataBaseOptions){
        if(options){
            options.type = options.type ?? "sqlite"
            this.config = options
        }
        else this.config = { type: "sqlite" };
        this.type = this.config.type
        DataBaseManager.type = this.type
    }

    protected async getDB(){
        const check = activeDataBases.find(s => s.name == this.database)
        if(check?.name == this.database) return check.db;
        const data: IDataBaseOptions = {...this.config}
        let db;
        switch (data.type){
            case "mysql":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.mysql,
                    synchronize: true
                });
            case "postgres":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.postgres,
                    synchronize: true
                });
            break;
            case "mongodb":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.mongo,
                    synchronize: true
                });
            break;
            default:
                console.log(this.entityManager.sqlite)
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.sqlite,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
                });
        }
        await db.initialize()
        activeDataBases.push({name: this.database, db})
        return db;
    }
};