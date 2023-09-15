import { NativeFunction, Return } from "forgescript";

export default new NativeFunction({
    name: "$dbVersion",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute() {
        return Return.success(require("../../package.json").version)
    },
})
