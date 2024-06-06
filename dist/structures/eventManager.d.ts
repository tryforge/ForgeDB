import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
import { Record } from '../util';
export interface IDBEvents {
    connect: [];
    variableCreate: [
        {
            data: Record | null;
        }
    ];
    variableDelete: [
        {
            data: Record | null;
        }
    ];
    variableUpdate: [
        {
            newData: Record | null;
            oldData: Record | null;
        }
    ];
}
export declare class DBEventHandler<T extends keyof IDBEvents> extends BaseEventHandler<IDBEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=eventManager.d.ts.map