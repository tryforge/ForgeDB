import { ForgeClient, ForgeExtension, FunctionManager } from "forgescript"
import { QuickDB, SqliteDriver } from "quick.db"

export type QuickDBTable = QuickDB<IQuickDBData>

export interface IQuickDBData {
    identifier: string
    id: string
    type: string
    value: string
}

export class ForgeQuickDB extends ForgeExtension {
    public static db: QuickDBTable

    name: string = "ForgeQuickDB"
    description: string = "Fast, reliable database driver for forge."
    version: string = "1.0.0"

    public constructor(public readonly path: string = "./forge.db") {
        super()
    }

    init(client: ForgeClient): void {
        FunctionManager.load(__dirname + "/functions")
        
        const db = new QuickDB({
            driver: new SqliteDriver(this.path)
        })

        client.db = db.table("main")
        ForgeQuickDB.db = db
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
            value
        })
    }

    public static delete(type: string, id: string) {
        const identifier = this.makeIdentifier(type, id)
        return this.db.delete(identifier)
    }

    public static allWithType(type: string) {
        return this.db.startsWith(type).then(x => x.map(x => x.value))
    }

    public static all(filter?: (row: IQuickDBData) => boolean) {
        return this.db.all()
            .then(x => x.map(x => x.value))
            .then(x => filter ? x.filter(filter) : x)
    }

    public static deleteWithFilter(fn: (row: IQuickDBData) => boolean) {
        return this.db.all().then(
            rows => rows.filter(x => fn(x.value))
        ).then(x => Promise.all(x.map(x => this.db.delete(x.id))))
    }

    public static deleteAll() {
        return this.db.deleteAll()
    }
}