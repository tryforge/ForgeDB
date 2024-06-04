import 'reflect-metadata';
import { Cooldown, IDataBaseOptions, Record, RecordData } from './types';
export declare class DataBase {
    private db;
    private static db;
    private static entities;
    constructor(options?: IDataBaseOptions);
    init(): Promise<void>;
    static make_intetifier(data: RecordData): string;
    static set(data: RecordData): Promise<Record>;
    static get(data: RecordData): Promise<Record | null>;
    static getAll(): Promise<Record[]>;
    static find(data?: RecordData): Promise<Record[]>;
    static delete(data: RecordData): Promise<import("typeorm").DeleteResult>;
    static wipe(): Promise<void>;
    static make_cdIdentifier(data: {
        name?: string;
        id?: string;
    }): string;
    static cdAdd(data: {
        name: string;
        id?: string;
        duration: number;
    }): Promise<Cooldown>;
    static cdDelete(identifier: string): Promise<void>;
    static cdTimeLeft(identifier: string): Promise<number>;
}
//# sourceMappingURL=database.d.ts.map