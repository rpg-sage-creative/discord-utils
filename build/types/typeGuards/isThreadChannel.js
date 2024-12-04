import { isChannel } from "./isChannel.js";
export function isThreadChannel(value) {
    return isChannel(value) && value.isThread();
}
