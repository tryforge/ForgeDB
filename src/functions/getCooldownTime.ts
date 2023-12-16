import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export default new NativeFunction({
    name: "$getCooldownTime",
    description: "Retrieves current cooldown time in ms for given id",
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
    async execute(ctx, [id]) {
        return this.success(await ForgeDB.cdTimeLeft(id))
    },
})