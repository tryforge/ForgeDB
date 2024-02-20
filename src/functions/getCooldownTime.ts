import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getCooldownTime",
    description: "Retrieves the current cooldown time in ms (milliseconds) for the given ID.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The ID for which to get its cooldown",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    async execute(ctx, [id]) {
        return this.success(await ForgeDB.cdTimeLeft(id))
    },
})
