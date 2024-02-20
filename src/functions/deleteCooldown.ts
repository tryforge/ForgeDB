import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$deleteCooldown",
    description: "Deletes the cooldown of given ID.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The ID for which to its cooldown.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    async execute(ctx, [id]) {
        ForgeDB.cdDelete(id)
        return this.success()
    },
})
