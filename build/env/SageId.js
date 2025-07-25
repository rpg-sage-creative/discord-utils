import { getId } from "@rsc-utils/core-utils";
export function getSageId() {
    return getId("bot");
}
export function isSageId(id) {
    return getSageId() === id;
}
