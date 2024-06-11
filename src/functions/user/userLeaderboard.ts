import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$userLeaderboard",
    version: "2.0.0",
    description: "Creates a user leaderboard for a variable",
    output: ArgType.String,
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "sort type",
            description: "The sort type for the leaderboard, either asc (ascending) or desc (descending)",
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
            description: "The variable name to use for $env. Retrieve the id with $env[<name>;id] and the value with $env[<name>;value]",
            rest: false,
            required: false,
            type: ArgType.String,
        },
        {
            name: "envPosition",
            description: "The variable name to use for $env. Retrieve the position with $env[<name>]",
            required: false,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "code",
            description: "Code to execute for each row.",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    async execute(ctx) {
        const [name, sortType, max, page, separator, valueVariable, positionVariable, code] = this.data.fields as IExtendedCompiledFunctionField[]
        
        const limit = Number(max?.value) || 10
        const pag = Number(page?.value) || 1
        console.log(sortType.value)
        const elements = new Array<string>()
        const rows = await DataBase.find({name: name.value, type: 'user'})
            .then((x) => x.sort((x, y) => (sortType?.value === "desc" ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))))
            .then((x) => x.slice(pag * limit - limit, pag * limit))
            
        for (let i = 0, len = rows.length; i < len; i++) {
            const index = pag * limit - limit + i + 1
            const row = rows[i]
            const username = ctx.client.users.cache.get(row.id)?.username
            
            const info = { username,...row }
            ctx.setEnvironmentKey(positionVariable?.value || '', index)
            ctx.setEnvironmentKey(valueVariable?.value || '', info)
            if(!code) elements.push(`${index}. ${username} ~ ${row.value}`)
            const execution = (await this["resolveCode"](ctx, code)) as Return
            if(execution.value) elements.push(execution.value as string)
        }

        return this.success(elements.join(separator?.value || '\n'))
    },
})
