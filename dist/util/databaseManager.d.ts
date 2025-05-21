import { DataSource, EntitySchema, MixedList } from "typeorm";
import { IDataBaseOptions } from "./types";
import "reflect-metadata";
export declare abstract class DataBaseManager {
    abstract database: string;
    abstract entityManager: {
        sqlite: MixedList<Function | string | EntitySchema>;
        mongo: MixedList<Function | string | EntitySchema>;
        mysql: MixedList<Function | string | EntitySchema>;
        postgres: MixedList<Function | string | EntitySchema>;
    };
    type: IDataBaseOptions["type"];
    static type: IDataBaseOptions["type"];
    private config;
    constructor(options?: IDataBaseOptions);
    protected getDB(): Promise<DataSource>;
}
//# sourceMappingURL=databaseManager.d.ts.map