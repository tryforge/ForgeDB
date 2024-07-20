import { IDBEvents } from "../structures";
export interface IDataBaseOptions {
    type: "mysql" | "postgres" | "sqlite" | "mongodb" | "better-sqlite3";
    events?: Array<keyof IDBEvents>;
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
}
export declare class Record {
    identifier: string;
    name: string;
    id: string;
    type: 'user' | 'channel' | 'role' | 'message' | 'member' | 'custom' | 'guild' | 'old';
    value: string;
    guildId?: string;
}
export type BaseData = {
    identifier?: string;
    name?: string;
    id?: string;
    value?: string;
};
export type GuildData = BaseData & {
    type?: 'member' | 'channel' | 'role';
    guildId: string;
};
export type NonGuildData = BaseData & {
    type?: 'user' | 'message' | 'custom' | 'guild' | 'old';
};
export type RecordData = BaseData & (GuildData | NonGuildData);
export declare class Cooldown {
    identifier: string;
    name: string;
    id?: string;
    startedAt: number;
    duration: number;
}
export type CooldownData = {
    identifier?: string;
    name?: string;
    id?: string;
    startedAt?: number;
    duration?: number;
};
export declare class MongoRecord extends Record {
    mongoId?: string;
}
export declare class MongoCooldown extends Cooldown {
    mongoId?: string;
}
//# sourceMappingURL=types.d.ts.map