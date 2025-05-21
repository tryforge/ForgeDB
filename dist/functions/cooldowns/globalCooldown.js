"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$globalCooldown",
    version: "2.0.0",
    description: "Adds a cooldown to a command for a global",
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
    ],
    async execute(ctx) {
        const [, , code] = this.data.fields;
        const dur = await this["resolveUnhandledArg"](ctx, 1);
        if (!this["isValidReturnType"](dur))
            return dur;
        const nameV = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](nameV))
            return nameV;
        const cooldown = await util_1.DataBase.cdTimeLeft(util_1.DataBase.make_cdIdentifier({ name: nameV.value }));
        if (cooldown.left !== 0) {
            ctx.setEnvironmentKey("time", cooldown.left);
            const content = await this["resolveCode"](ctx, code);
            if (!this["isValidReturnType"](content))
                return content;
            ctx.container.content = content.value;
            await ctx.container.send(ctx.obj);
            return this.stop();
        }
        await util_1.DataBase.cdAdd({ name: nameV.value, duration: dur.value });
        return this.success();
    },
});
//# sourceMappingURL=globalCooldown.js.map