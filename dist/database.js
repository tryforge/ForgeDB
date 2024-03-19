"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = exports.DataType = void 0;
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const promises_1 = require("fs/promises");
var DataType;
(function (DataType) {
    DataType[DataType["global"] = 0] = "global";
    DataType[DataType["guild"] = 1] = "guild";
    DataType[DataType["user"] = 2] = "user";
    DataType[DataType["member"] = 3] = "member";
    DataType[DataType["channel"] = 4] = "channel";
    DataType[DataType["message"] = 5] = "message";
    DataType[DataType["role"] = 6] = "role";
    DataType[DataType["emojis"] = 7] = "emojis";
})(DataType || (exports.DataType = DataType = {}));
;
async function configPrisma(prismaSchema) {
    const directoryPath = './prisma';
    if (fs.existsSync(directoryPath)) {
        if ((await (0, promises_1.readFile)(`${directoryPath}/schema.prisma`)).toString() == prismaSchema)
            return false;
        fs.writeFileSync(`${directoryPath}/schema.prisma`, prismaSchema);
        return true;
    }
    else {
        fs.mkdirSync(directoryPath);
        fs.writeFileSync(`${directoryPath}/schema.prisma`, prismaSchema);
        return true;
    }
}
async function connect(data) {
    if (await configPrisma(data))
        (0, child_process_1.execSync)("npx prisma generate && npx prisma db push");
}
class DataBase {
    static db;
    constructor(options) {
        const data = `generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "${options?.type ?? "sqlite"}"\n  url = "${options?.url ?? "file:./forge.db"}"\n}\n\nmodel data {\n  identifier String @id @map("_id")\n  name String\n  id String\n  type String\n  value String\n}\n\nmodel cds {\n  id String @id @map("_id")\n  startedAt Float \n  duration Int\n}`;
        connect(data).then(() => { DataBase.db = new client_1.PrismaClient(); });
    }
    static async all() {
        return await this.db.data.findMany();
    }
    static async set(options) {
        const data = {
            ...options,
            identifier: `${options.name}_${options.id}_${options.type}`
        };
        return await this.db.data.create({ data }).catch(async (err) => {
            return await this.db.data.update({
                data: {
                    value: data.value
                },
                where: { identifier: `${data.name}_${data.id}_${data.type}` }
            });
        });
    }
    static async get(options) {
        const data = {
            ...options,
            identifier: `${options.name}_${options.id}_${options.type}`
        };
        return await this.db.data.findUnique({
            where: {
                identifier: `${data.name}_${data.id}_${data.type}`
            }
        });
    }
    static async delete(data) {
        return await this.db.data.delete({ where: { identifier: `${data.name}_${data.id}_${data.type}` } }).catch(err => { });
    }
    static async allWithType(name, type) {
        return (await this.db.data.findMany()).filter(s => s.type == type && s.name == name);
    }
    static async wipe() {
        return await this.db.data.deleteMany();
    }
    static async cdAdd(data) {
        return this.db.cds.create({ data: { ...data, startedAt: Date.now() } })
            .catch(err => { this.db.cds.update({ where: { id: data.id }, data: { duration: data.duration, startedAt: Date.now() } }); });
    }
    static async cdDelete(id) {
        await this.db.cds.delete({ where: { id } });
    }
    static async cdTimeLeft(id) {
        const data = await this.db.cds.findUnique({ where: { id } });
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0;
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map