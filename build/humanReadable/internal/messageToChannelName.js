import { toUserName } from "../toUserName.js";
import { channelToName } from "./channelToName.js";
/** @internal */
export function messageToChannelName(message) {
    const author = toUserName(message.author);
    if (message.guild) {
        return channelToName(message.channel) + author;
    }
    else {
        return author;
    }
}
