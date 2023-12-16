import { NativeFunction } from "forgescript"

export default new NativeFunction({
    name: "$dbVersion",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute() {
        return this.success(require("../../package.json").version)
    },
})
