import { NativeFunction } from "forgescript"

export default new NativeFunction({
    name: "$dbVersion",
    version: "1.0.0",
    category: "unknown",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute() {
        return this.success(require("../../package.json").version)
    },
})
