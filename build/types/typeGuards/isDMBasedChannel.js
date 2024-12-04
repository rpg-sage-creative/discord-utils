import { isChannel } from "./isChannel.js";
export function isDMBasedChannel(value) {
    return isChannel(value) && value.isDMBased();
}
