"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const database_1 = require("../database");
exports.default = new forgescript_1.NativeFunction({
    name: "$cooldown",
    description: "Adds a cooldown to a command",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the command",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "id",
            rest: false,
            description: "The id to assign the cooldown to, can be anything",
            type: forgescript_1.ArgType.String,
            required: true,
        }, {
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: database_1.DataType,
            required: true,
        },
        {
            name: "duration",
            description: "The duration of the cooldown",
            rest: false,
            type: forgescript_1.ArgType.Time,
            required: true,
        },
        {
            name: "code",
            description: "The code to execute if the cooldown is active",
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    async execute(ctx) {
        const [, , , , code] = this.data.fields;
        const dur = await this["resolveUnhandledArg"](ctx, 3);
        if (!this["isValidReturnType"](dur))
            return dur;
        const nameV = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](nameV))
            return nameV;
        const idV = await this["resolveUnhandledArg"](ctx, 1);
        if (!this["isValidReturnType"](idV))
            return idV;
        const typeV = await this["resolveUnhandledArg"](ctx, 2);
        if (!this["isValidReturnType"](idV))
            return idV;
        if (database_1.DataType[typeV.value] == 'member' && idV.value.split('_').length != 2)
            return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        const cooldown = await database_1.DataBase.cdTimeLeft(`${nameV.value}_${idV.value}_${database_1.DataType[typeV.value]}`);
        if (cooldown !== 0) {
            const content = await this["resolveCode"](ctx, code);
            if (!this["isValidReturnType"](content))
                return content;
            ctx.container.content = content.value;
            await ctx.container.send(ctx.obj);
            return this.stop();
        }
        await database_1.DataBase.cdAdd({ id: `${nameV.value}_${idV.value}_${database_1.DataType[typeV.value]}`, duration: dur.value });
        return this.success();
    },
});
//# sourceMappingURL=cooldown.js.map