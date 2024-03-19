import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import * as fs from "fs";
import { readFile } from "fs/promises";

export enum DataType { custom, guild, user, member, channel, message, role, emojis };

export interface IPrismaData {
    identifier: string
    name: string;
    id: string
    type: 'custom' | 'guild' | 'user' | 'member' | 'channel' | 'message' | 'role' | 'emojis';
    value: string
}

async function configPrisma(prismaSchema: string) {
    const directoryPath = './prisma';
    if(fs.existsSync(directoryPath)){
        if((await readFile(`${directoryPath}/schema.prisma`)).toString() == prismaSchema) return false;
        fs.writeFileSync(`${directoryPath}/schema.prisma`, prismaSchema)
        return true;
    } else {
        fs.mkdirSync(directoryPath);
        fs.writeFileSync(`${directoryPath}/schema.prisma`, prismaSchema)
        return true
    }
}

async function connect(data:string){ 
    if(await configPrisma(data)) 
    execSync("npx prisma generate && npx prisma db push") 
}

export interface IDataBaseOptions {
    type: "mongodb";
    url: `mongodb+svr://${string}:${string}@${string}`;
}

export class DataBase {
    private static db: PrismaClient

    constructor(options?: IDataBaseOptions){
        const data =`generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "${options?.type ?? "sqlite"}"\n  url = "${options?.url ?? "file:./forge.db"}"\n}\n\nmodel data {\n  identifier String @id @map("_id")\n  name String\n  id String\n  type String\n  value String\n}\n\nmodel cds {\n  id String @id @map("_id")\n  startedAt Float \n  duration Int\n}`
        connect(data).then( () => { DataBase.db = new PrismaClient() })
    }

    public static async all(){
        return await this.db.data.findMany()
    }

    public static async set(options: { name:string, id: string, type: IPrismaData['type'], value: string}){
        const data = {
            ...options,
            identifier: `${options.name}_${options.id}_${options.type}`
        }
        return await this.db.data.create({data}).catch(async err => {
            return await this.db.data.update({
                data: {
                    value: data.value
                },
                where: { identifier: `${data.name}_${data.id}_${data.type}`}})
        })
    }

    public static async get(options: {name:string, id: string, type: IPrismaData['type']}){
        const data = {
            ...options,
            identifier: `${options.name}_${options.id}_${options.type}`
        }
        return await this.db.data.findUnique({
            where: {
                identifier: `${data.name}_${data.id}_${data.type}`
            }
        })
    }

    public static async delete(data: {name:string, id: string, type: IPrismaData['type']}){
        return await this.db.data.delete({where: { identifier: `${data.name}_${data.id}_${data.type}`}}).catch(err =>{})
    }

    public static async allWithType(name:string, type: string) {
        return (await this.db.data.findMany()).filter(s => s.type == type && s.name == name)
    }

    public static async wipe(){
        return await this.db.data.deleteMany()
    }

    public static async cdAdd(data: {id: string, duration: number}){
        return this.db.cds.create({ data : { ...data, startedAt: Date.now() } })
        .catch(err => {this.db.cds.update({where: { id: data.id }, data: {duration: data.duration, startedAt: Date.now()} })})
    }

    public static async cdDelete(id: string) {
        await this.db.cds.delete({ where: { id } })
    }

    public static async cdTimeLeft(id: string) {
        const data = await this.db.cds.findUnique({ where: { id } })
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0
    }
}