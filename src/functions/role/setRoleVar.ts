import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setRoleVar",
    version: "2.0.0",
    description: "Sets a role's value in a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },{
            name: "role ID",
            description: "The role id of the variable",
            rest: false,
            type: ArgType.Role,
            required: true,
        }
    ],
    brackets: true,
    async execute(_ctx, [name, value, role]) {
        await DataBase.set({name, id: role.id, value, type: "role", guildId: role.guild.id})
        return this.success()
    },
})