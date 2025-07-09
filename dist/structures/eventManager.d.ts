import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { SQLiteRecord } from "../util";
export interface IDBEvents {
    connect: [];
    variableCreate: [
        {
            data: SQLiteRecord | null;
        }
    ];
    variableDelete: [
        {
            data: SQLiteRecord | null;
        }
    ];
    variableUpdate: [
        {
            newData: SQLiteRecord | null;
            oldData: SQLiteRecord | null;
        }
    ];
}
export declare class DBEventHandler<T extends keyof IDBEvents> extends BaseEventHandler<IDBEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=eventManager.d.ts.map