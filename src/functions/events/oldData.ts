import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataType, RecordData } from "../../util"

export default new NativeFunction({
    name: "$oldData",
    version: "2.0.0",
    description: "Retrieves the old data that has been updated for a record during an update event",
    unwrap: true,
    args: [
        {
            name: "type",
            description: "The type of data you want to retrieve",
            rest: false,
            type: ArgType.Enum,
            enum: DataType,
            required: true,
        },
    ],
    brackets: true,
    async execute(ctx, [type]) {
        //@ts-ignore
        return this.success((ctx.runtime.extras as { oldData: RecordData }).oldData[DataType[type].toString()])
    },
})
