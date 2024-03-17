import { ForgeClient, ForgeExtension, IExtendedCompilationResult } from "@tryforge/forgescript";
import { IDataBaseOptions } from "./database";
export declare class ForgeDB extends ForgeExtension {
    readonly options?: IDataBaseOptions | undefined;
    static defaults?: Record<PropertyKey, IExtendedCompilationResult | unknown>;
    name: string;
    description: string;
    version: string;
    constructor(options?: IDataBaseOptions | undefined);
    init(client: ForgeClient): void;
    variables(rec: Record<PropertyKey, unknown>): void;
    static variables(rec: Record<PropertyKey, unknown>): void;
    private static compileVariables;
}
//# sourceMappingURL=index.d.ts.map