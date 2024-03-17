import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType, IPrismaData } from "../database"

export default new NativeFunction({
    name: "$deleteVar",
    description: "Deletes a value from a variable",
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
            name: "id",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: ArgType.Enum,
            enum: DataType,
            required: true,
        }
    ],
    async execute(_ctx, [name, id, type]) {
        if(DataType[type] == 'member' && id.split('_').length != 2) return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        await DataBase.delete({name, id, type: DataType[type] as IPrismaData['type']})
        return this.success()
    },
})
