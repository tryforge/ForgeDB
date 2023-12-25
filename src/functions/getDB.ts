import { NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getDB",
    version: "1.0.0",
    category: "unknown",
    description: "Returns all the identifiers stored in the DB",
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await ForgeDB.all())
    },
})
