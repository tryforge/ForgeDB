import { ForgeClient, ForgeExtension, IExtendedCompilationResult } from "@tryforge/forgescript";
export declare class ForgeDB extends ForgeExtension {
    readonly path: string;
    static defaults?: Record<PropertyKey, IExtendedCompilationResult | unknown>;
    name: string;
    description: string;
    version: string;
    constructor(path?: string);
    init(client: ForgeClient): void;
    variables(rec: Record<PropertyKey, unknown>): void;
    static variables(rec: Record<PropertyKey, unknown>): void;
    private static compileVariables;
}
//# sourceMappingURL=index.d.ts.map