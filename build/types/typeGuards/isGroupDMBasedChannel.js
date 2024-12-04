import { isDMBasedChannel } from "./isDMBasedChannel.js";
export function isGroupDMBasedChannel(value) {
    return isDMBasedChannel(value) && "recipients" in value;
}
