import { NativeFunction, Return } from "../structures"

export default new NativeFunction({
    name: "$dbVersion",
    version: "1.0.0",
    description: "Returns the db version you're using",
    unwrap: false,
    execute(ctx) {
        return Return.success(require("../../package.json").version)
    },
})
