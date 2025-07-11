import { Cooldown, IDataBaseOptions, MongoCooldown, MongoRecord, MySQLRecord, PostgreSQLRecord, RecordData, SQLiteRecord } from "./types";
import { TypedEmitter } from "tiny-typed-emitter";
import { IDBEvents } from "../structures";
import { TransformEvents } from "..";
import "reflect-metadata";
import { DataBaseManager } from "./databaseManager";
export declare class DataBase extends DataBaseManager {
    private emitter;
    database: string;
    entityManager: {
        sqlite: (typeof SQLiteRecord | typeof Cooldown)[];
        mongodb: (typeof MongoRecord | typeof MongoCooldown)[];
        mysql: (typeof MySQLRecord | typeof Cooldown)[];
        postgres: (typeof PostgreSQLRecord | typeof Cooldown)[];
    };
    private static entities;
    private db;
    private static db;
    private static emitter;
    constructor(emitter: TypedEmitter<TransformEvents<IDBEvents>>, options?: IDataBaseOptions);
    init(): Promise<void>;
    static make_intetifier(data: RecordData): string;
    static set(data: RecordData): Promise<void>;
    static get(data: RecordData): Promise<SQLiteRecord | null>;
    static getAll(): Promise<SQLiteRecord[]>;
    static find(data?: RecordData): Promise<SQLiteRecord[]>;
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
        id?: string | undefined;
        startedAt: number;
        duration: number;
    } | {
        left: number;
    }>;
    static query(query: string): Promise<any>;
}
//# sourceMappingURL=database.d.ts.map