import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType } from "../../database"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a value in the leaderboard of a variable",
    output: ArgType.Number,
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
    async execute(_ctx, [name, id, type, sortType]) {
        if(DataType[type] == 'member' && id.split('_').length != 2) return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        const data = await DataBase.allWithType(name, DataType[type])
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(sortType ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === id)
        return this.success(index + 1)
    },
})