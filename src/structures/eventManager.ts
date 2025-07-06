import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { ForgeDB } from ".."
import { SQLiteRecord } from "../util"

export interface IDBEvents {
    connect: []
    variableCreate: [
        {
            data: SQLiteRecord | null
        },
    ]
    variableDelete: [
        {
            data: SQLiteRecord | null
        },
    ]
    variableUpdate: [
        {
            newData: SQLiteRecord | null
            oldData: SQLiteRecord | null
        },
    ]
}

export class DBEventHandler<T extends keyof IDBEvents> extends BaseEventHandler<IDBEvents, T> {
    register(client: ForgeClient): void {
        //@ts-ignore
        client.getExtension(ForgeDB, true)["emitter"].on(this.name, this.listener.bind(client))
    }
}
