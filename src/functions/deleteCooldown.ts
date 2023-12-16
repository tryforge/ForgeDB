import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$deleteCooldown",
    description: "Deletes cooldown of given id",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The id to delete its cooldown",
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