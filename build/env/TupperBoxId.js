import { getId } from "@rsc-utils/core-utils";
/** Returns the known id for Tupperbox. */
export function getTupperBoxId() {
    return getId("tupperBox");
}
/** Convenient test and type guard for: id === getTupperBoxId() */
export function isTupperBoxId(id) {
    const tupperId = getTupperBoxId();
    return tupperId && id ? id === getTupperBoxId() : false;
}
