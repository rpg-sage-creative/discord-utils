import { isGameChannel } from "./isGameChannel.js";
export function isThreadGameChannel(channel) {
    return isGameChannel(channel) && channel.isThread();
}
