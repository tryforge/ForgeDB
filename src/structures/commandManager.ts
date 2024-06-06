import { BaseCommandManager } from "@tryforge/forgescript";
import { IDBEvents } from "./eventManager";

export class DBCommandManager extends BaseCommandManager<keyof IDBEvents> {
    handlerName = 'ForgeDBEvents'
}