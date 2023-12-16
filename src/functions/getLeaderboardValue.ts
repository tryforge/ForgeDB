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
