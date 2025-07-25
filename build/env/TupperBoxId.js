import { getId } from "@rsc-utils/core-utils";
export function getTupperBoxId() {
    return getId("tupperBox");
}
export function isTupperBoxId(id) {
    const tupperId = getTupperBoxId();
    return tupperId && id ? id === getTupperBoxId() : false;
}
