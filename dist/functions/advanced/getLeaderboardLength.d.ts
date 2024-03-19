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
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof DataType;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Number;
    required: false;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Boolean;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=getLeaderboardLength.d.ts.map