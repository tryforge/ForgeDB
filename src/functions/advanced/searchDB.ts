import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, VariableType } from "../../util"

export default new NativeFunction({
    name: "$searchDB",
    aliases: ["$searchRecords", "$searchDataBase"],
    version: "2.0.0",
    description: "Retrieves variables associated with your inputs.",
    output: ArgType.Unknown,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable from which you want to retrieve the value.",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "id",
            description: "The unique identifier of the user, guild, channel, or any other type.",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "type",
            description: "The type or category of the variable.",
            rest: false,
            type: ArgType.Enum,
            enum: VariableType,
            required: false,
        },
        {
            name: "value",
            description: "The value associated with the variable.",
            rest: false,
            type: ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The unique identifier of the guild to which the member, channel, or role belongs.",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type, value, guild]) {
        let search = {}

        if (name) search = { ...search, name }
        if (id) search = { ...search, id }
        if (type) search = { ...search, type: VariableType[type]?.toString() }
        if (value) search = { ...search, value }
        if (guild) search = { ...search, guildId: guild.id }

        return this.successJSON(await DataBase.find({ ...search }))
    },
})
