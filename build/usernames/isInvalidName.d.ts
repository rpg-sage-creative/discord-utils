import { type Optional } from "@rsc-utils/core-utils";
/**
 * Checks to see if the name contains something that Discord won't allow.
 * If found, returns the "root" value being looked for, not the specific variant.
 * If not round, returns false.
 */
export declare function isInvalidName(name: Optional<string>): string | false;
