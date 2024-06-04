import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export enum SortType {
    asc,
    desc,
}

export default new NativeFunction({
    name: "$getMemberLeaderboardValue",
    version: "2.0.0",
    description: "Returns the position of a member in the leaderboard of a variable",
    output: ArgType.Number,
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
            name: "sort type",
            description: "The sort type for the leaderboard, either asc/0 (ascending) or desc/1 (descending)",
            rest: false,
            type: ArgType.Enum,
            enum: SortType,
        },{
            name: "member ID",
            description: "The member id of the value",
            rest: false,
            type: ArgType.User,
            required: false,
        },{
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: ArgType.Guild,
            required: false,
        }
    ],
    brackets: true,
    async execute(ctx, [name, sortType, member, guild]) {
        const data = await DataBase.find({name, type: "member", guildId: guild?.id ?? ctx.guild!.id})
        data.sort((a, b) => parseInt(a.value) - parseInt(b.value))
        const index = ([SortType[0], SortType.asc].indexOf(sortType ?? "asc") === -1 ? data : [...data].reverse()).findIndex((s) => s.id === (member?.id ?? ctx.member?.id))
        return this.success(index + 1)
    },
})