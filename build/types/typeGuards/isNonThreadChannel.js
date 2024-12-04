import { isChannel } from "./isChannel.js";
export function isNonThreadChannel(value) {
    return isChannel(value) && !value.isThread();
}
