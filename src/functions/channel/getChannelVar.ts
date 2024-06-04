import { ArgType, IExtendedCompilationResult, Interpreter, NativeFunction } from "@tryforge/forgescript"
import { BaseGuildTextChannel } from 'discord.js'
import { DataBase } from "../../util"
import { ForgeDB } from "../.."

export default new NativeFunction({
    name: "$getChannelVar",
    version: "2.0.0",
    description: "Returns a variable's value of a channel",
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
            name: "channel ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.Channel,
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
    async execute(ctx, [name, channel, def]) {
        const data = await DataBase.get({name, id: channel?.id ?? ctx.channel!.id, type: "channel", guildId: (channel as BaseGuildTextChannel)?.guild.id ?? ctx.guild?.id}).then((x) => x?.value)
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