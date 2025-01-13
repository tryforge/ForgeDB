import { Entity, Column, PrimaryColumn, ObjectIdColumn } from "typeorm"
import { IDBEvents } from "../structures";

export type IDataBaseOptions = ({
    type: "mysql" | "postgres";
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
} | {
    type: "mongodb";
    url: string;
}| {
    type: "better-sqlite3" | "sqlite";
    folder?: string;
}) & {events?: Array<keyof IDBEvents>}

@Entity()
export class Record {
    @PrimaryColumn()
    identifier!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    id!: string;

    @Column()
    type!: 'user' | 'channel' | 'role' | 'message' | 'member' | 'custom' | 'guild' | 'old';

    @Column("mediumtext")
    value!: string;

    @Column({ nullable: true })
    guildId?: string;
}

export type BaseData = {
    identifier?: string;
    name?: string;
    id?: string;
    value?: string;
};

export type GuildData = BaseData & { type?: 'member' | 'channel' | 'role'; guildId: string };
export type NonGuildData = BaseData & { type?: 'user' | 'message' | 'custom' | 'guild' | 'old';};

export type RecordData = BaseData & (GuildData | NonGuildData);

@Entity()
export class Cooldown {
    @PrimaryColumn()
    identifier!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    id?: string;

    @Column()
    startedAt!: number;

    @Column()
    duration!: number;
}

export type CooldownData = {
    identifier?: string;
    name?: string;
    id?: string;
    startedAt?: number;
    duration?: number;
}

@Entity()
export class MongoRecord extends Record {
    @ObjectIdColumn()
    mongoId?: string
}

@Entity()
export class MongoCooldown extends Cooldown {
    @ObjectIdColumn()
    mongoId?: string
}