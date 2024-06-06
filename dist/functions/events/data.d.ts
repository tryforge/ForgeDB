import { ArgType, NativeFunction } from "@tryforge/forgescript";
export declare enum DataType {
    identifier = 0,
    name = 1,
    id = 2,
    type = 3,
    value = 4,
    guildId = 5
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof DataType;
    required: true;
}], true>;
export default _default;
//# sourceMappingURL=data.d.ts.map