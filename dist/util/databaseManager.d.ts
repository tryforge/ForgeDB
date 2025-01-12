import { DataSource, EntitySchema, MixedList } from "typeorm";
import 'reflect-metadata';
import { IDataBaseOptions } from "./types";
export declare abstract class DataBaseManager {
    abstract database: string;
    abstract activeEntities: MixedList<Function | string | EntitySchema>;
    type: IDataBaseOptions['type'];
    private config;
    constructor(options?: IDataBaseOptions);
    private wrapEntitiesForMongo;
    protected getDB(): Promise<DataSource>;
    get entities(): Record<string, string | Function | EntitySchema<any>>;
    static get entities(): any;
}
//# sourceMappingURL=databaseManager.d.ts.map