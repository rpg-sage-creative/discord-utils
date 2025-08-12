import { isGameChannel } from "./isGameChannel.js";
export function isTextGameChannel(channel) {
    return isGameChannel(channel) && "send" in channel;
}
