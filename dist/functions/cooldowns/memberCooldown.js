"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$memberCooldown",
    version: "2.0.0",
    description: "Adds a cooldown to a command for a member",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the command you are trying to add a cooldown",
            rest: false,
            type: forgescript_1.ArgType.String,
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
        {
            name: "member ID",
            rest: false,
            description: "The member id to assign the cooldown to",
            type: forgescript_1.ArgType.User,
            required: false
        }, {
            name: "guild ID",
            description: "The guild of the identifier",
            rest: false,
            type: forgescript_1.ArgType.Guild,
            required: false,
        }
    ],
    async execute(ctx) {
        const [, , code] = this.data.fields;
        const dur = await this["resolveUnhandledArg"](ctx, 1);
        if (!this["isValidReturnType"](dur))
            return dur;
        const nameV = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](nameV))
            return nameV;
        const idV = await this["resolveUnhandledArg"](ctx, 3);
        if (!this["isValidReturnType"](idV))
            return idV;
        const guildV = await this["resolveUnhandledArg"](ctx, 4);
        if (!this["isValidReturnType"](guildV))
            return guildV;
        const cooldown = await util_1.DataBase.cdTimeLeft(util_1.DataBase.make_cdIdentifier({ name: `${nameV.value}-${guildV.id}`, id: idV.value?.id ?? ctx.channel?.id }));
        if (cooldown !== 0) {
            const content = await this["resolveCode"](ctx, code);
            if (!this["isValidReturnType"](content))
                return content;
            ctx.container.content = content.value;
            await ctx.container.send(ctx.obj);
            return this.stop();
        }
        await util_1.DataBase.cdAdd({ name: `${nameV.value}-${guildV.id}`, id: idV.value?.id ?? ctx.member?.id, duration: dur.value });
        return this.success();
    },
});
//# sourceMappingURL=memberCooldown.js.map