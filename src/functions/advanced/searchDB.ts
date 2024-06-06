import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, RecordData } from "../../util"

export enum VariableType { user, channel, role, message, member, custom, guild }

export default new NativeFunction({
    name: "$searchDB",
    version: "2.0.0",
    description: "Returns a variable's value of a channel",
    output: ArgType.Unknown,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "id",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "type",
            description: "The name of the variable",
            rest: false,
            type: ArgType.Enum,
            enum: VariableType,
            required: false,
        },
        {
            name: "value",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The name of the variable",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type, value, guild]) {
        
        const search = {
            name: name ? name : undefined,
            id: id ? id : undefined,
            //@ts-ignore
            type: VariableType[type]?.toString(),
            value: value ? value : undefined,
            guildId: guild?.id
        }
        
        return this.successJSON(await DataBase.find({...search}))
    }
})