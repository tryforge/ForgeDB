import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setMessageVar",
    version: "2.0.0",
    description: "Sets a message's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },
        {
            name: "message ID",
            description: "The ID of the message",
            rest: false,
            type: ArgType.String,
            required: false,
        },
    ],
    brackets: true,
    async execute(ctx, [name, value, message]) {
        await DataBase.set({ name, id: message ?? ctx.message!.id, value, type: "message" })
        return this.success()
    },
})
