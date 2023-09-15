import { NativeFunction, Return } from "forgescript"

export default new NativeFunction({
    name: "$cpuType",
    version: "1.0.0",
    description: "Returns the cpu type",
    unwrap: false,
    execute(ctx) {
        // eslint-disable-next-line no-undef
        return Return.success(os.type())
    },
})
