export declare enum DataType {
    global = 0,
    guild = 1,
    user = 2,
    member = 3,
    channel = 4,
    message = 5
}
export interface IPrismaData {
    identifier: string;
    name: string;
    id: string;
    type: 'global' | 'guild' | 'user' | 'member' | 'channel' | 'message';
    value: string;
}
export interface IDataBaseOptions {
    type: "mongodb";
    url: `mongodb+svr://${string}:${string}@${string}`;
}
export declare class DataBase {
    private static db;
    constructor(options?: IDataBaseOptions);
    static all(): Promise<{
        identifier: string;
        name: string;
        id: string;
        type: string;
        value: string;
    }[]>;
    static set(options: {
        name: string;
        id: string;
        type: IPrismaData['type'];
        value: string;
    }): Promise<{
        identifier: string;
        name: string;
        id: string;
        type: string;
        value: string;
    }>;
    static get(options: {
        name: string;
        id: string;
        type: IPrismaData['type'];
    }): Promise<{
        identifier: string;
        name: string;
        id: string;
        type: string;
        value: string;
    } | null>;
    static delete(data: {
        name: string;
        id: string;
        type: IPrismaData['type'];
    }): Promise<void | {
        identifier: string;
        name: string;
        id: string;
        type: string;
        value: string;
    }>;
    static allWithType(name: string, type: string): Promise<{
        identifier: string;
        name: string;
        id: string;
        type: string;
        value: string;
    }[]>;
    static wipe(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    static cdAdd(data: {
        id: string;
        duration: number;
    }): Promise<void>;
    static cdDelete(id: string): Promise<void>;
    static cdTimeLeft(id: string): Promise<number>;
}
//# sourceMappingURL=database.d.ts.map