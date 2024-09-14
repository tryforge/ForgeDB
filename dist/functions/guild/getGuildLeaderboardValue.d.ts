import { ArgType, NativeFunction } from "@tryforge/forgescript";
export declare enum SortType {
    asc = 0,
    desc = 1
}
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
    type: ArgType.String;
    required: false;
}], true>;
export default _default;
//# sourceMappingURL=getGuildLeaderboardValue.d.ts.map