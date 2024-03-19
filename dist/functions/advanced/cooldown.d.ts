import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { DataType } from "../../database";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: true;
}, {
    name: string;
    rest: false;
    description: string;
    type: ArgType.String;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof DataType;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Time;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
}], false>;
export default _default;
//# sourceMappingURL=cooldown.d.ts.map