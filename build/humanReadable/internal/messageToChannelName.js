import { toUserName } from "../toUserName.js";
import { channelToName } from "./channelToName.js";
export function messageToChannelName(message) {
    const author = toUserName(message.author);
    if (message.guild) {
        return channelToName(message.channel) + author;
    }
    else {
        return author;
    }
}
