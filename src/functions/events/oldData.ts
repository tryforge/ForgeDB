import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { RecordData } from "../../util"

export enum DataType { identifier, name, id, type, value, guildId }

export default new NativeFunction({
    name: "$oldData",
    version: "2.0.0",
    description: "Retrieve the old data has been updated of a record on update event",
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
        return this.success((ctx.runtime.extras as {oldData: RecordData}).oldData[DataType[type].toString()])
    },
})