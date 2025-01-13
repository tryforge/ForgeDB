import { Compiler, EventManager, ForgeClient, ForgeExtension, IExtendedCompilationResult } from "@tryforge/forgescript"
import { DataBase, IDataBaseOptions } from "./util"
import { DBCommandManager, IDBEvents } from "./structures"
import { TypedEmitter } from "tiny-typed-emitter"

export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never
}

export class ForgeDB extends ForgeExtension {
    public static defaults?: Record<PropertyKey, IExtendedCompilationResult | unknown>

    name: string = "ForgeDB"
    description: string = "A fast and reliable database extension for Forge"
    version: string = require("../package.json").version

    public commands!: any
    public emitter = new TypedEmitter<TransformEvents<IDBEvents>>()

    public constructor(public readonly options?: IDataBaseOptions) {
        super()
    }

    init(client: ForgeClient): void {
        this.commands = new DBCommandManager(client)

        EventManager.load('ForgeDBEvents', __dirname + '/events')
        this.load(__dirname + "/functions")
        
        new DataBase(this.emitter, this.options).init()
        client.db = DataBase

        if (this.options?.events?.length)
            client.events.load("ForgeDBEvents", this.options.events)
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
export { DataBaseManager } from './util'