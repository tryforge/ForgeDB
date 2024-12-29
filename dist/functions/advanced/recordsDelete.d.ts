import { ArgType, NativeFunction } from "@tryforge/forgescript";
export declare enum VariableType {
    user = 0,
    channel = 1,
    role = 2,
    message = 3,
    member = 4,
    custom = 5,
    guild = 6
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof VariableType;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Guild;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=recordsDelete.d.ts.map