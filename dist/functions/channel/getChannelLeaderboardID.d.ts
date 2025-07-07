import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { SortType } from "../../util";
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
    enum: typeof SortType;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Number;
    required: true;
}], true>;
export default _default;
//# sourceMappingURL=getChannelLeaderboardID.d.ts.map