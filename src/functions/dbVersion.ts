import { NativeFunction, Return } from "forgescript";
import { ForgeDB } from "..";

export default new NativeFunction({
    name: "$dbVersion",
    description: "Returns the db version you're using",
    unwrap: false,
    execute(ctx) {
        return Return.success(require("../../package.json").version)
    },
})
