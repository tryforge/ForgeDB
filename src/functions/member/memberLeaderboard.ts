import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$memberLeaderboard",
    version: "2.0.0",
    description: "Creates a leaderboard of members for a variable",
    output: ArgType.String,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to create the leaderboard for",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "guild ID",
            description: "The guild ID for which to retrieve the variable of members",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
        {
            name: "sort type",
            description: "The sort order for the leaderboard, either ascending (asc) or descending (desc)",
            rest: false,
            type: ArgType.Enum,
            enum: SortType,
        },
        {
            name: "max",
            description: "The maximum number of rows per page",
            rest: false,
            type: ArgType.Number,
        },
        {
            name: "page",
            description: "The page number",
            rest: false,
            type: ArgType.Number,
        },
        {
            name: "separator",
            description: "The separator to use for each row",
            rest: false,
            type: ArgType.String,
        },
        {
            name: "envValue",
            description: "The variable name to use for $env, retrieve the id with $env[<name>;id] and the value with $env[<name>;value]",
            rest: false,
            required: false,
            type: ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name to use for $env, retrieve the position with $env[<name>]",
            required: false,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "code",
            description: "Code to execute for each row, remember to use $return",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    async execute(ctx, [name, guild, sortType, max, page, separator, valueVariable, positionVariable]) {
        const limit = max || 10
        const pag = page || 1
        const [, , , , , , , , code] = this.data.fields as IExtendedCompiledFunctionField[]
        
        const elements = new Array<string>()
        const rows = await DataBase.find({name, type: 'member', guildId: guild?.id ?? ctx.guild!.id})
            .then((x) => x.sort((x, y) => (sortType === SortType.desc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit))
            
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1
            const row = rows[i]
            const username = ctx.client.guilds.cache.get(guild?.id ?? ctx.guild!.id)?.members.cache.get(row.id)?.user.username
            
            const info = { username,...row }
            ctx.setEnvironmentKey(positionVariable || '', index)
            ctx.setEnvironmentKey(valueVariable || '', info)
            if(!code) elements.push(`${index}. ${username} ~ ${row.value}`)
            const execution = (await this["resolveCode"](ctx, code)) as Return
            console.log(execution)
            if(execution.value) elements.push(execution.value as string)
        }

        return this.success(elements.join(separator || '\n'))
    },
})
