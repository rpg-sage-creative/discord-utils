import { isChannel } from "./isChannel.js";
export function isGuildBasedChannel(value) {
    return isChannel(value) && "guild" in value;
}
