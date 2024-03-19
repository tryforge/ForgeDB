import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType, IPrismaData } from "../../database"

export default new NativeFunction({
    name: "$setVar",
    version: "2.0.0",
    description: "Sets an identifier's value in a variable",
    unwrap: true,
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
        },{
            name: "value",
            description: "The value",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type, value]) {
        if(DataType[type] == 'member' && id.split('_').length != 2) return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        if(DataType[type] == 'channel' && id.split('_').length != 2) return this.error(Error('The `id` field with the type `channel` must follow this format: `channelID_guildID`'));
        await DataBase.set({name, id, value, type: DataType[type] as IPrismaData['type']})
        return this.success()
    },
})
