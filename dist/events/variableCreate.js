"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const eventManager_1 = require("../structures/eventManager");
exports.default = new eventManager_1.DBEventHandler({
    name: "variableCreate",
    version: "2.0.0",
    description: "This event is triggered when a new variable gets created.",
    listener(extras) {
        const commands = this.getExtension(__1.ForgeDB, true).commands.get("variableCreate");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras,
            });
        }
    },
});
//# sourceMappingURL=variableCreate.js.map