import { isGameChannel } from "./isGameChannel.js";
export function isNonThreadGameChannel(channel) {
    return isGameChannel(channel) && !channel.isThread();
}
