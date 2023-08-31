# $leaderboard
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Creates a leaderboard
## Usage
```
$leaderboard[type;value;position;code;sort type;max;page;separator]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
type | String | The type of the var, eg server, user, role, etc, up to you. | Yes | No
value | String | The variable name to load the value to, retrieve id with $env[<name>;id] and value with $env[<name>;value] | Yes | No
position | String | The variable name to load the position to | Yes | No
code | String | Code to execute for every row found, remember to use $return. | Yes | No
sort type | Enum (`Asc`, `Desc`) | The sort type for the leaderboard | No | No
max | Number | The max amount of rows per page | No | No
page | Number | The page number | No | No
separator | String | The separator to use for every row | No | No
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/leaderboard.ts)
    
</summary>
    
```ts
import { ArgType, IExtendedCompiledFunctionField, NativeFunction, Return, ReturnType } from "forgescript";
import { ForgeQuickDB } from "..";

export enum SortType {
    Asc,
    Desc
}

export default new NativeFunction({
    name: "$leaderboard",
    description: "Creates a leaderboard",
    unwrap: false,
    args: [
        {
            name: "type",
            description: "The type of the var, eg server, user, role, etc, up to you.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "value",
            description: "The variable name to load the value to, retrieve id with $env[<name>;id] and value with $env[<name>;value]",
            rest: false,
            required: true,
            type: ArgType.String
        },
        {
            name: "position",
            description: "The variable name to load the position to",
            required: true,
            rest: false,
            type: ArgType.String
        },
        {
            name: "code",
            description: "Code to execute for every row found, remember to use $return.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "sort type",
            description: "The sort type for the leaderboard",
            rest: false,
            type: ArgType.Enum,
            enum: SortType
        },
        {
            name: "max",
            description: "The max amount of rows per page",
            rest: false,
            type: ArgType.Number
        },
        {
            name: "page",
            description: "The page number",
            rest: false,
            type: ArgType.Number
        },
        {
            name: "separator",
            description: "The separator to use for every row",
            rest: false,
            type: ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx) {
        const [
            type,
            valueVariable,
            positionVariable,
            code,
            sortType,
            max,
            page,
            separator
        ] = this.data.fields! as IExtendedCompiledFunctionField[]

        const typeExec = await this["resolveCode"](ctx, type) as Return
        if (!this["isValidReturnType"](typeExec)) return typeExec

        const valueVariableName = await this["resolveCode"](ctx, valueVariable) as Return
        if (!this["isValidReturnType"](valueVariableName)) return valueVariableName

        const positionVariableName = await this["resolveCode"](ctx, positionVariable) as Return
        if (!this["isValidReturnType"](positionVariableName)) return positionVariableName

        const sortTypeValue = await this["resolveCode"](ctx, sortType) as Return
        if (!this["isValidReturnType"](sortTypeValue)) return sortTypeValue

        const limitExec = await this["resolveCode"](ctx, max) as Return
        if (!this["isValidReturnType"](limitExec)) return limitExec

        const pageExec = await this["resolveCode"](ctx, page) as Return
        if (!this["isValidReturnType"](pageExec)) return pageExec

        const sepExec = await this["resolveCode"](ctx, separator) as Return
        if (!this["isValidReturnType"](sepExec)) return sepExec

        const varType = typeExec.value as string
        const pos = positionVariableName.value as string
        const valueName = valueVariableName.value as string
        const sort = sortTypeValue.value === "Desc" ? SortType.Asc : SortType.Desc
        const limit = Number(limitExec.value) || 10
        const pag = Number(pageExec.value) || 1
        const sep = sepExec.value as string || "\n"

        const elements = new Array<string>()

        const rows = await ForgeQuickDB.allWithType(varType)
            .then(
                x => x.sort((x, y) => sort === SortType.Asc ? Number(x.value) - Number(y.value) : Number(y.value) - Number(x.value))
            )
            .then(
                x => x.slice(pag * limit - limit, pag * limit)
            )

        for (let i = 0, len = rows.length;i < len;i++) {
            const index = pag * limit - limit + i + 1
            const row = rows[i]

            ctx.setEnvironmentKey(pos, index)
            ctx.setEnvironmentKey(valueName, row)
            
            const execution = await this["resolveCode"](ctx, code) as Return
            if (!execution.return && !this["isValidReturnType"](execution)) return execution
            else if (execution.return) elements.push(execution.value as string)
        }

        return Return.success(elements.join(sep))
    },
})
```
    
</details>