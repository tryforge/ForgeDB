import { DataSource, EntitySchema, MixedList } from "typeorm";
import 'reflect-metadata';
import { IDataBaseOptions } from "./types";
export declare abstract class DataBaseManager {
    abstract database: string;
    abstract entityManager: {
        entities: MixedList<Function | string | EntitySchema>;
        mongoEntities: MixedList<Function | string | EntitySchema>;
    };
    type: IDataBaseOptions['type'];
    private config;
    constructor(options?: IDataBaseOptions);
    protected getDB(): Promise<DataSource>;
}
//# sourceMappingURL=databaseManager.d.ts.map