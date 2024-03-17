import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { DataType } from "../database";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof DataType;
    required: true;
}], true>;
export default _default;
//# sourceMappingURL=deleteCooldown.d.ts.map