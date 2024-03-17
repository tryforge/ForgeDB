import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import * as fs from "fs";

export enum DataType { global, guild, user, member, channel, message };

export interface IPrismaData {
    identifier: string
    name: string;
    id: string
    type: 'global' | 'guild' | 'user' | 'member' | 'channel' | 'message';
    value: string
}

const prismaSchema = `generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "sqlite"\n  url = "file:./forge.db"\n}\n\nmodel data {\n  identifier String @id @map("_id")\n  name String\n  id String\n  type String\n  value String\n}\n\nmodel cds {\n  id String @id @map("_id")\n  startedAt Int \n  duration Int\n}`;
function createPrismaConfig() {
    const directoryPath = './prisma';
    if(fs.existsSync(directoryPath)) return false;
    fs.mkdirSync(directoryPath);
    fs.writeFileSync(`${directoryPath}/schema.prisma`, prismaSchema)
    return true
}

export class DataBase {
    private static db: PrismaClient

    constructor(){
        if(createPrismaConfig()) execSync("npx prisma generate && npx prisma db push");
        DataBase.db = new PrismaClient()
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
        this.db.cds.create({ data : { ...data, startedAt: Date.now() } })
    }

    public static async cdDelete(id: string) {
        await this.db.cds.delete({ where: { id } })
    }

    public static async cdTimeLeft(id: string) {
        const data = await this.db.cds.findUnique({ where: { id } })
        return data ? Math.max(data.duration - (Date.now() - data.startedAt), 0) : 0
    }
}