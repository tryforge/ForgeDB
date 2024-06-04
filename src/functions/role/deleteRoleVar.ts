import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteRoleVar",
    version: "2.0.0",
    description: "Deletes a value from a role variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "role ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.Role,
            required: true,
        }
    ],
    async execute(_ctx, [name, role]) {
        await DataBase.delete({name, id: role?.id, type: "role", guildId: role.guild.id})
        return this.success()
    },
})