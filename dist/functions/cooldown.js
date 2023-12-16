"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$cooldown",
    description: "Adds a command cooldown",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "id",
            rest: false,
            description: "The id to assign the cooldown to, can be anything",
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
        const idV = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](idV))
            return idV;
        const cooldown = await __1.ForgeDB.cdTimeLeft(idV.value);
        if (cooldown !== 0) {
            const content = await this["resolveCode"](ctx, code);
            if (!this["isValidReturnType"](content))
                return content;
            ctx.container.content = content.value;
            await ctx.container.send(ctx.obj);
            return this.stop();
        }
        await __1.ForgeDB.cdAdd(idV.value, dur.value);
        return this.success();
    },
});
//# sourceMappingURL=cooldown.js.map