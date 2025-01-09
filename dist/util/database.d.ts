import { Cooldown, IDataBaseOptions, MongoCooldown, MongoRecord, Record, RecordData } from './types';
import { TypedEmitter } from 'tiny-typed-emitter';
import { IDBEvents } from '../structures';
import { TransformEvents } from '..';
import 'reflect-metadata';
import { DataBaseManager } from './databaseManager';
export declare class DataBase extends DataBaseManager {
    private emitter;
    database: string;
    entityManager: {
        entities: (typeof Record | typeof Cooldown)[];
        mongoEntities: (typeof MongoRecord | typeof MongoCooldown)[];
    };
    private db;
    private static type;
    private static db;
    private static emitter;
    private static entities;
    constructor(emitter: TypedEmitter<TransformEvents<IDBEvents>>, options?: IDataBaseOptions);
    init(): Promise<void>;
    static make_intetifier(data: RecordData): string;
    static set(data: RecordData): Promise<void>;
    static get(data: RecordData): Promise<Record | null>;
    static getAll(): Promise<Record[]>;
    static find(data?: RecordData): Promise<Record[]>;
    static delete(data: RecordData): Promise<import("typeorm").DeleteResult>;
    static wipe(): Promise<void>;
    static cdWipe(): Promise<void>;
    static make_cdIdentifier(data: {
        name?: string;
        id?: string;
    }): string;
    static cdAdd(data: {
        name: string;
        id?: string;
        duration: number;
    }): Promise<Cooldown | import("typeorm").UpdateResult>;
    static cdDelete(identifier: string): Promise<void>;
    static cdTimeLeft(identifier: string): Promise<{
        left: number;
        identifier: string;
        name: string;
        id?: string;
        startedAt: number;
        duration: number;
    } | {
        left: number;
    }>;
    static query(query: string): Promise<any>;
}
//# sourceMappingURL=database.d.ts.map