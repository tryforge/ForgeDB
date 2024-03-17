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
export declare class DataBase {
    private static db;
    constructor();
    static all(): Promise<any>;
    static set(options: {
        name: string;
        id: string;
        type: IPrismaData['type'];
        value: string;
    }): Promise<any>;
    static get(options: {
        name: string;
        id: string;
        type: IPrismaData['type'];
    }): Promise<any>;
    static delete(data: {
        name: string;
        id: string;
        type: IPrismaData['type'];
    }): Promise<any>;
    static allWithType(name: string, type: string): Promise<any>;
    static wipe(): Promise<any>;
    static cdAdd(data: {
        id: string;
        duration: number;
    }): Promise<void>;
    static cdDelete(id: string): Promise<void>;
    static cdTimeLeft(id: string): Promise<number>;
}
//# sourceMappingURL=database.d.ts.map