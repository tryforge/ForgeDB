import { ArgType, NativeFunction, Return } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getDB",
    description: "Returns all the identifiers stored in the DB",
    unwrap: false,
    async execute(_ctx) {
        return Return.success(await ForgeDB.all())
    },
})
