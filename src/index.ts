import { ForgeClient, ForgeExtension, FunctionManager } from "forgescript"
import { QuickDB, SqliteDriver } from "quick.db"

export type QuickDBTable = QuickDB<IQuickDBData>

export interface IQuickDBData {
    identifier: string
    id: string
    type: string
    value: string
}

export class ForgeDB extends ForgeExtension {
    public static db: QuickDBTable

    name = "ForgeDB"
    description = "A fast and reliable database extension for Forge"
    version = "1.0.0"

    public constructor(public readonly path: string = "./forge.db") {
        super()
    }

    init(client: ForgeClient): void {
        FunctionManager.load(__dirname + "/functions")

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
}
