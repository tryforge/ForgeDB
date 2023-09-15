import { NativeFunction, Return } from "forgescript";

export default new NativeFunction({
    name: "$dbVersion",
    description: "Returns the db version you're using",
    unwrap: false,
    execute() {
        return Return.success(require("../../package.json").version)
    },
})
