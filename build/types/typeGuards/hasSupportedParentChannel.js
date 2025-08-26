import { isSupportedParentChannel } from "./isSupportedParentChannel.js";
export function hasSupportedParentChannel(channel) {
    if (!channel || !("parent" in channel) || !channel.parent)
        return false;
    return isSupportedParentChannel(channel.parent);
}
