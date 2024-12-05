import type { Optional } from "@rsc-utils/core-utils";
/** Checks to see if the name contains something that Discord won't allow. */
export declare function isUnsafeName(name: Optional<string>): "discord" | false;
