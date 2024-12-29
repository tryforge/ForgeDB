import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$wipeDB",
    version: "2.0.8",
    aliases: ["$deleteDB", "$clearDB"],
    description: "Whipes all the data stored in the database including cooldowns",
    output: ArgType.Json,
    unwrap: false,
    async execute(_ctx) {
        await DataBase.wipe();
        await DataBase.cdWipe()
        return this.success()
    },
})
