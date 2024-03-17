"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../database");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getVar",
    description: "Returns an identifier's value in a variable",
    output: forgescript_1.ArgType.Unknown,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "id",
            description: "The identifier of the value",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: database_1.DataType,
            required: true,
        },
        {
            name: "default",
            description: "The default value if the identifier doesn't exist in the variable",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    brackets: true,
    async execute(ctx, [name, id, type, def]) {
        if (database_1.DataType[type] == 'member' && id.split('_').length != 2)
            return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        const data = await database_1.DataBase.get({ name, id, type: database_1.DataType[type] }).then((x) => x?.value);
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
//# sourceMappingURL=getVar.js.map