import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getDB",
    version: "1.0.0",
    aliases: ["$getDataBase", "$getRecords"],
    description: "Returns all stored identifiers in the database",
    output: ArgType.Json,
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await DataBase.getAll())
    },
})
