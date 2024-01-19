import { ForgeClient, ForgeExtension, IExtendedCompilationResult } from "forgescript";
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
    static defaults?: Record<PropertyKey, IExtendedCompilationResult | unknown>;
    name: string;
    description: string;
    version: string;
    constructor(path?: string);
    init(client: ForgeClient): void;
    static makeIdentifier(type: string, id: string): string;
    static get(type: string, id: string): any;
    static set(type: string, id: string, value: string): any;
    static delete(type: string, id: string): any;
    static allWithType(type: string): Promise<any>;
    static all(filter?: (row: IQuickDBData) => boolean): Promise<any>;
    static deleteWithFilter(filter: (row: IQuickDBData) => boolean): Promise<any>;
    static deleteAll(): any;
    static cdAdd(id: string, duration: number): Promise<void>;
    static cdDelete(id: string): Promise<void>;
    static cdTimeLeft(id: string): Promise<number>;
    variables(rec: Record<PropertyKey, unknown>): void;
    static variables(rec: Record<PropertyKey, unknown>): void;
    private static compileVariables;
}
//# sourceMappingURL=index.d.ts.map