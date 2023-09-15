import { NativeFunction, Return } from "forgescript"

export default new NativeFunction({
    name: "$cpuCoreCount",
    version: "1.0.0",
    description: "Returns the cpu core count",
    unwrap: false,
    execute(ctx) {
        // eslint-disable-next-line no-undef
        return Return.success(os.cpu)
    },
})
