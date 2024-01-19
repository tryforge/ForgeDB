import { ArgType, NativeFunction } from "forgescript"

export default new NativeFunction({
    name: "$dbVersion",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    output: ArgType.Number,
    unwrap: false,
    execute() {
        return this.success(require("../../package.json").version)
    },
})
