"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class DBEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        //@ts-ignore
        client.getExtension(__1.ForgeDB, true)['emitter'].on(this.name, this.listener.bind(client));
    }
}
exports.DBEventHandler = DBEventHandler;
//# sourceMappingURL=eventManager.js.map