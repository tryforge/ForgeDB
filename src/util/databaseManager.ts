import "reflect-metadata";
import { IDataBaseOptions } from "./types";
import { DataSource, EntitySchema, MixedList } from "typeorm";

const activeDataBases: { name: string; db: DataSource }[] = [];
let config: IDataBaseOptions;

export abstract class DataBaseManager {
    public abstract database: string
    public abstract entityManager: {
        sqlite: MixedList<Function | string | EntitySchema>
        mongodb: MixedList<Function | string | EntitySchema>
        mysql: MixedList<Function | string | EntitySchema>
        postgres: MixedList<Function | string | EntitySchema>
    }

    public type?: IDataBaseOptions["type"]
    public static type: IDataBaseOptions["type"]

    constructor(options?: IDataBaseOptions) {
        if (!config && options) {
            options.type = options.type ?? "sqlite"
            config = options
        }
    }

    protected async getDB() {
        await this.waitForConfig();
        this.type = config.type
        DataBaseManager.type = this.type

        const check = activeDataBases.find((s) => s.name == this.database)
        if (check?.name == this.database) return check.db;
        const data: IDataBaseOptions = { ...config };
        let db;
        switch (data.type) {
            case "mysql":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.mysql,
                    synchronize: true,
                })
                break;
            case "postgres":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.postgres,
                    synchronize: true,
                })
                break;
            case "mongodb":
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.mongodb,
                    synchronize: true,
                })
                break;
            default:
                db = new DataSource({
                    ...data,
                    entities: this.entityManager.sqlite,
                    synchronize: true,
                    database: `${data.folder ?? "database"}/${this.database}`,
                })
            break;
        }
        db = await db.initialize()
        activeDataBases.push({ name: this.database, db })
        return db
    }

    private async waitForConfig(){
        return new Promise((resolve) => {
            const check = setInterval(() => {
                if(config){
                    clearInterval(check)
                    resolve(config)
                }
            }, 50)
            setTimeout(() => {
                clearInterval(check)
                if(!config) throw new Error("Unable to resolve ForgeDB extension configuration. Dependent packages failed to initialize.")
            }, 10_000)
        })
    }
}
