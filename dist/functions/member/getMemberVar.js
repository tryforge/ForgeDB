"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getMemberVar",
    version: "2.0.0",
    description: "Retrieves the value of a variable associated with a member",
    output: forgescript_1.ArgType.Unknown,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable to query",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "member ID",
            description: "The member ID for which to retrieve the variable value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "guild ID",
            description: "The guild ID to which the member belongs",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        },
        {
            name: "default",
            description: "The default value to return if the identifier doesn't exist in the variable",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    brackets: true,
    async execute(ctx, [name, member, guild, def]) {
        const data = await util_1.DataBase.get({ name, id: member ?? ctx.member.id, type: "member", guildId: guild?.id ?? ctx.guild.id }).then((x) => x?.value);
        if (data === null || data === undefined) {
            if (def)
                return this.successJSON(def);
            else if (__1.ForgeDB.defaults && name in __1.ForgeDB.defaults) {
                const defData = __1.ForgeDB.defaults[name];
                if (typeof defData === "object" && defData !== null && "functions" in defData) {
                    const d = defData;
                    // Run
                    const result = await forgescript_1.Interpreter.run(ctx.clone({
                        data: d,
                        allowTopLevelReturn: true,
                        doNotSend: true,
                        redirectErrorsToConsole: true,
                    }));
                    return result === null ? this.stop() : this.successJSON(result);
                }
                else
                    return this.successJSON(defData);
            }
        }
        return this.successJSON(data);
    },
});
//# sourceMappingURL=getMemberVar.js.map