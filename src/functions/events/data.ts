import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { RecordData } from "../../util"

export enum DataType { identifier, name, id, type, value, guildId }

export default new NativeFunction({
    name: "$data",
    version: "2.0.0",
    description: "Retrieve the data has been set/deleted of a record on create and delete events",
    unwrap: true,
    args: [
        {
            name: "type",
            description: "The type of what you want to retrieve",
            rest: false,
            type: ArgType.Enum,
            enum: DataType,
            required: true,
        }
    ],
    brackets: true,
    async execute(ctx, [type]) {
        //@ts-ignore
        return this.success((ctx.runtime.extras as {data: RecordData}).data[DataType[type].toString()])
    },
})