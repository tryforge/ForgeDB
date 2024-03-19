import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../database"

export default new NativeFunction({
    name: "$getDB",
    version: "1.0.0",
    description: "Returns all the stored values in the DB",
    output: ArgType.Json,
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await DataBase.all())
    },
})
