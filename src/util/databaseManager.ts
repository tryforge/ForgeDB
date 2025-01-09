import { DataSource, EntitySchema, MixedList } from "typeorm";
import 'reflect-metadata';
import { IDataBaseOptions } from "./types";

export abstract class DataBaseManager {
    public abstract database: string;
    public abstract entityManager: {
        entities: MixedList<Function | string | EntitySchema>
        mongoEntities: MixedList<Function | string | EntitySchema>
    }
    public type: IDataBaseOptions['type'];
    private config: IDataBaseOptions
    private activeDataBases?: {name: string; db: DataSource;}[]

    constructor(options?: IDataBaseOptions){
        if(options) options.type = options.type ?? "sqlite"
        this.config = options ?? { type: "sqlite" }
        this.type = this.config.type
    }

    protected async getDB(){
        if(!this.activeDataBases) this.activeDataBases = []
        const check = this.activeDataBases.find(s => s.name == "")
        if(check?.name == this.database) return check.db;
        const data: IDataBaseOptions = {...this.config}
        switch (data.type){
            case "mysql":
            case "postgres":
                data.database = this.database
                return new DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true
                });
            case "mongodb":
                return new DataSource({
                    ...data,
                    entities: this.entityManager.mongoEntities,
                    synchronize: true
                });
            default:
                return new DataSource({
                    ...data,
                    entities: this.entityManager.entities,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`
            });
        }
    }
};