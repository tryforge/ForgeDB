import { ArgType, NativeFunction, Return } from "forgescript";
import { ForgeDB } from "..";

export enum SortType {
    asc,
    desc
}

export default new NativeFunction({
    name: "$getLeaderboardValue",
    description: "Returns leaderboard position value.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "id",
            description: "The identifier of a user, guild, channel, message, etc.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "sort type",
            description: "The sort type for the leaderboard. Either asc (top to bottom) or desc (bottom to top)",
            rest: false,
            type: ArgType.Enum,
            enum: SortType
        }
    ],
    brackets: true,
    async execute(_ctx, [ name, id, type ]) {
        const data = await ForgeDB.allWithType(name)
        data.sort((a, b) => {
            const valueA = parseInt(a.value);
            const valueB = parseInt(b.value);
            return valueB - valueA;
        });
        const index = ([SortType[0], SortType.asc].indexOf(type ?? 'asc') === -1 ? data : [...data].reverse()).findIndex(s => s.id === id);
        return Return.success(index+1)
    },
})
