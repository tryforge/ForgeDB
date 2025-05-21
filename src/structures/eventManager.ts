import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { ForgeDB } from ".."
import { Record } from "../util"

export interface IDBEvents {
    connect: []
    variableCreate: [
        {
            data: Record | null
        },
    ]
    variableDelete: [
        {
            data: Record | null
        },
    ]
    variableUpdate: [
        {
            newData: Record | null
            oldData: Record | null
        },
    ]
}

export class DBEventHandler<T extends keyof IDBEvents> extends BaseEventHandler<IDBEvents, T> {
    register(client: ForgeClient): void {
        //@ts-ignore
        client.getExtension(ForgeDB, true)["emitter"].on(this.name, this.listener.bind(client))
    }
}
