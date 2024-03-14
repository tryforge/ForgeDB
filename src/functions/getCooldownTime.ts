import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getCooldownTime",
    version: "1.0.0",
    description: "Retrieves current cooldown time in ms for given id",
    output: ArgType.Number,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The id to get its cooldown",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    async execute(_ctx, [id]) {
        return this.success(await ForgeDB.cdTimeLeft(id))
    },
})