import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$channelLeaderboard",
    version: "2.0.0",
    description: "Creates a leaderboard specific to channels based on a variable.",
    output: ArgType.String,
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the variable used to create the leaderboard.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "guild ID",
            description: "The unique identifier of the guild for which you want to retrieve channel variables.",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
        {
            name: "sort type",
            description: "The sorting order for the leaderboard, either ascending (asc) or descending (desc).",
            rest: false,
            type: ArgType.Enum,
            enum: SortType,
        },
        {
            name: "max",
            description: "The maximum number of entries to display per page on the leaderboard.",
            rest: false,
            type: ArgType.Number,
        },
        {
            name: "page",
            description: "The specific page number of the leaderboard you wish to view.",
            rest: false,
            type: ArgType.Number,
        },
        {
            name: "separator",
            description: "The separator to be utilized between each row in the leaderboard.",
            rest: false,
            type: ArgType.String,
        },
        {
            name: "envValue",
            description: "The variable name to employ for $env, facilitating the retrieval of identifiers and values using $env[<name>;id] and $env[<name>;value] respectively.",
            rest: false,
            required: false,
            type: ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name utilized for $env to acquire the position using $env[<name>].",
            required: false,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "code",
            description: "Code executed for each row.",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    async execute(ctx) {
        const [name, guild, sortType, max, page, separator, valueVariable, positionVariable, code] = this.data.fields as IExtendedCompiledFunctionField[]
        const limit = Number(max?.value) || 10
        const pag = Number(page?.value) || 1

        const guildID = (await this["resolveCode"](ctx, guild)) as Return
        if (!this["isValidReturnType"](guildID)) return guildID

        const elements = new Array<string>()
        const rows = await DataBase.find({name: name.value, type: 'channel', guildId: guildID.value as string ?? ctx.guild!.id})
            .then((x) => x.sort((x, y) => (sortType?.value === "desc" ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit))
            
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1
            const row = rows[i]
            const channel_name = ctx.client.guilds.cache.get(guildID.value as string ?? ctx.guild!.id)?.channels.cache.get(row.id)?.name
            
            const info = { channel_name,...row }
            ctx.setEnvironmentKey(positionVariable?.value || '', index)
            ctx.setEnvironmentKey(valueVariable?.value || '', info)
            if(!code) elements.push(`${index}. ${channel_name} ~ ${row.value}`)
            const execution = (await this["resolveCode"](ctx, code)) as Return
            if(execution.value) elements.push(execution.value as string)
        }

        return this.success(elements.join(separator?.value || '\n'))
    },
})
