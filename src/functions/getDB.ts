import { NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getDB",
    description: "Returns all the identifiers stored in the database.",
    unwrap: false,
    async execute(_ctx) {
        return this.successJSON(await ForgeDB.all())
    },
})
