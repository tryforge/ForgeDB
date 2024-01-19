import { Compiler, ForgeClient, ForgeExtension, IExtendedCompilationResult } from "forgescript"
import { QuickDB, SqliteDriver } from "quick.db"

export type QuickDBTable = QuickDB<IQuickDBData>

export interface IQuickDBData {
    /* Normal DB */
    identifier: string
    id: string
    type: string
    value: string
    /* For Cooldowns */
    startedAt: number
    duration: number
}

export class ForgeDB extends ForgeExtension {
    public static db: QuickDBTable
    public static defaults?: Record<PropertyKey, IExtendedCompilationResult | unknown>

    name: string = "ForgeDB"
    description: string = "A fast and reliable database extension for Forge"
    version: string = "1.0.0"

    public constructor(public readonly path: string = "./forge.db") {
        super()
    }

    init(client: ForgeClient): void {
        this.load(__dirname + "/functions")

        ForgeDB.db = new QuickDB({
            driver: new SqliteDriver(this.path),
        })

        client.db = ForgeDB.db.table("main")
    }

    public static makeIdentifier(type: string, id: string) {
        return `${type}_${id}`
    }

    public static get(type: string, id: string) {
        return this.db.get(this.makeIdentifier(type, id)) ?? {}
    }

    public static set(type: string, id: string, value: string) {
        const identifier = this.makeIdentifier(type, id)
        return this.db.set(identifier, {
            identifier,
            id,
            type,
            value,
        })
    }

    public static delete(type: string, id: string) {
        return this.db.delete(this.makeIdentifier(type, id))
    }

    public static async allWithType(type: string) {
        return (await this.db.startsWith(type)).map((x) => x.value)
    }

    public static async all(filter: (row: IQuickDBData) => boolean = () => true) {
        const all = await this.db.all()
        return all.map((x) => x.value).filter(filter)
    }

    public static async deleteWithFilter(filter: (row: IQuickDBData) => boolean) {
        const all = await this.db.all()
        return Promise.all(all.filter((x) => filter(x.value)).map((x) => this.db.delete(x.id)))
    }

    public static deleteAll() {
        return this.db.deleteAll()
    }

    public static async cdAdd(id: string, duration: number) {
        await this.db.set(id, {
            startedAt: Date.now(),
            duration,
        })
    }

    public static async cdDelete(id: string) {
        await this.db.delete(id)
    }

    public static async cdTimeLeft(id: string) {
        const data = await this.db.get(id)
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0
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
