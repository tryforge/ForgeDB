import { Compiler, ForgeClient, ForgeExtension, IExtendedCompilationResult } from "@tryforge/forgescript"
import { DataBase, IDataBaseOptions } from "./database"

export class ForgeDB extends ForgeExtension {
    public static defaults?: Record<PropertyKey, IExtendedCompilationResult | unknown>

    name: string = "ForgeDB"
    description: string = "A fast and reliable database extension for Forge"
    version: string = "2.0.0"

    public constructor(public readonly options?: IDataBaseOptions) {
        super()
    }

    init(client: ForgeClient): void {
        this.load(__dirname + "/functions")
        new DataBase(this.options)
        client.db = DataBase
    }

    public variables(rec: Record<PropertyKey, unknown>) {
        ForgeDB.variables(rec)
    }

    public static variables(rec: Record<PropertyKey, unknown>) {
        ForgeDB.defaults = ForgeDB.compileVariables(rec)
    }

    private static compileVariables(rec: Record<PropertyKey, unknown>) {
        const obj = {} as Record<PropertyKey, IExtendedCompilationResult | unknown>
        for (const [key, value] of Object.entries(rec)) {
            if (typeof value === "string") {
                obj[key] = Compiler.compile(value)
            } else {
                obj[key] = value
            }
        }
        return obj
    }
}
