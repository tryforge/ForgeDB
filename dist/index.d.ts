import { ForgeClient, ForgeExtension } from "forgescript";
import { QuickDB } from "quick.db";
export type QuickDBTable = QuickDB<IQuickDBData>;
export interface IQuickDBData {
    identifier: string;
    id: string;
    type: string;
    value: string;
    startedAt: number;
    duration: number;
}
export declare class ForgeDB extends ForgeExtension {
    readonly path: string;
    static db: QuickDBTable;
    name: string;
    description: string;
    version: string;
    constructor(path?: string);
    init(client: ForgeClient): void;
    static makeIdentifier(type: string, id: string): string;
    static get(type: string, id: string): Promise<IQuickDBData | null>;
    static set(type: string, id: string, value: string): Promise<{
        identifier: string;
        id: string;
        type: string;
        value: string;
    }>;
    static delete(type: string, id: string): Promise<number>;
    static allWithType(type: string): Promise<IQuickDBData[]>;
    static all(filter?: (row: IQuickDBData) => boolean): Promise<IQuickDBData[]>;
    static deleteWithFilter(filter: (row: IQuickDBData) => boolean): Promise<number[]>;
    static deleteAll(): Promise<number>;
    static cdAdd(id: string, duration: number): Promise<void>;
    static cdDelete(id: string): Promise<void>;
    static cdTimeLeft(id: string): Promise<number>;
}
//# sourceMappingURL=index.d.ts.map