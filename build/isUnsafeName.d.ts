import type { Optional } from "@rsc-utils/core-utils";
export type UnsafeNameData = {
    /** sets how the value is tested */
    type: "anchored" | "chars" | "partial";
    /** the value found */
    value: string;
};
/** Checks to see if the name contains something that Discord won't allow. */
export declare function isUnsafeName(name: Optional<string>): UnsafeNameData | false;
