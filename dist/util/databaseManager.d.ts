import "reflect-metadata";
import { IDataBaseOptions } from "./types";
import { DataSource, EntitySchema, MixedList } from "typeorm";
export declare abstract class DataBaseManager {
    abstract database: string;
    abstract entityManager: {
        sqlite: MixedList<Function | string | EntitySchema>;
        mongo: MixedList<Function | string | EntitySchema>;
        mysql: MixedList<Function | string | EntitySchema>;
        postgres: MixedList<Function | string | EntitySchema>;
    };
    type?: IDataBaseOptions["type"];
    static type: IDataBaseOptions["type"];
    constructor(options?: IDataBaseOptions);
    protected getDB(): Promise<DataSource>;
    private waitForConfig;
}
//# sourceMappingURL=databaseManager.d.ts.map