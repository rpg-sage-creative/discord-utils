import { channelToName } from "./internal/channelToName.js";
import { messageToChannelName } from "./internal/messageToChannelName.js";
export function toChannelName(value) {
    if (value) {
        if ("channelId" in value) {
            return messageToChannelName(value);
        }
        return channelToName(value);
    }
    return undefined;
}
