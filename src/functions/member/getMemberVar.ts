import { ArgType, IExtendedCompilationResult, Interpreter, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"
import { ForgeDB } from "../.."

export default new NativeFunction({
    name: "$getMemberVar",
    version: "2.0.0",
    description: "Returns a variable's value of a member",
    output: ArgType.Unknown,
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
            name: "member ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.User,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: ArgType.Guild,
            required: false,
        },
        {
            name: "default",
            description: "The default value if the identifier doesn't exist in the variable",
            rest: false,
            required: false,
            type: ArgType.String,
        },
    ],
    brackets: true,
    async execute(ctx, [name, member, guild, def]) {
        const data = await DataBase.get({name, id: member?.id ?? ctx.member!.id, type: "member", guildId: guild?.id ?? ctx.guild!.id}).then((x) => x?.value)
        if (data === null || data === undefined) {
            if (def) return this.successJSON(def)
            else if (ForgeDB.defaults && name in ForgeDB.defaults) {
                const defData = ForgeDB.defaults[name]
                if (typeof defData === "object" && defData !== null && "functions" in (defData as IExtendedCompilationResult)) {
                    const d = <IExtendedCompilationResult>defData
                    // Run
                    const result = await Interpreter.run(
                        ctx.clone({
                            data: d,
                            allowTopLevelReturn: true,
                            doNotSend: true,
                            redirectErrorsToConsole: true,
                        })
                    )
                    return result === null ? this.stop() : this.successJSON(result)
                } else return this.successJSON(defData)
            }
        }

        return this.successJSON(data)
    },
})