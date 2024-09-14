"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$userCooldown",
    version: "2.0.0",
    description: "Adds a cooldown to a command for a user",
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
            name: "user ID",
            rest: false,
            description: "The user id to assign the cooldown to",
            type: forgescript_1.ArgType.String,
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
        const cooldown = await util_1.DataBase.cdTimeLeft(util_1.DataBase.make_cdIdentifier({ name: nameV.value, id: idV.value?.id ?? ctx.user?.id }));
        if (cooldown.left !== 0) {
            ctx.setEnvironmentKey("time", cooldown.left);
            const content = await this["resolveCode"](ctx, code);
            if (!this["isValidReturnType"](content))
                return content;
            ctx.container.content = content.value;
            await ctx.container.send(ctx.obj);
            return this.stop();
        }
        await util_1.DataBase.cdAdd({ name: nameV.value, id: idV.value?.id ?? ctx.user?.id, duration: dur.value });
        return this.success();
    },
});
//# sourceMappingURL=userCooldown.js.map