# $getLeaderboardValue
> <img align="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png?20150409153300" alt="image" width="25" height="auto"> Returns the position of a value in the leaderboard of a variable
## Usage
```
$getLeaderboardValue[name;id;sort type]
```
| Name | Type | Description | Required | Spread
| :---: | :---: | :---: | :---: | :---: |
name | String | The name of the variable | Yes | No
id | String | The identifier of the value (of a user, guild, channel, message, etc) | Yes | No
sort type | Enum (`asc`, `desc`) | The sort type for the leaderboard, either asc/0 (ascending) or desc/1 (descending) | No | No
<details>
<summary>
    
## <img align="top" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="image" width="25" height="auto">  [Source Code](https://github.com/tryforge/ForgeScript-V2/blob/main/src/native/getLeaderboardValue.ts)
    
</summary>
    
```ts
import { ArgType, NativeFunction } from "forgescript"
import { ForgeDB } from ".."

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getLeaderboardValue",
    description: "Returns the position of a value in the leaderboard of a variable",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "id",
            description: "The identifier of the value (of a user, guild, channel, message, etc)",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "sort type",
            description: "The sort type for the leaderboard, either asc/0 (ascending) or desc/1 (descending)",
            rest: false,
            type: ArgType.Enum,
            enum: SortType,
        },
    ],
    brackets: true,
    async execute(_ctx, [name, id, type]) {
        const data = await ForgeDB.allWithType(name)
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(type ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === id)
        return this.success(index + 1)
    },
})

```
    
</details>