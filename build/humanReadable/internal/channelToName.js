import { ZERO_WIDTH_SPACE } from "@rsc-utils/core-utils";
import { isDMBasedChannel, isGroupDMBasedChannel } from "../../types/index.js";
import { toGuildName } from "../toGuildName.js";
import { toUserName } from "../toUserName.js";
export function channelToName(channel) {
    if (channel) {
        if (isDMBasedChannel(channel)) {
            if (isGroupDMBasedChannel(channel)) {
                return channel.recipients.map(toUserName).join(",");
            }
            return toUserName(channel.recipient);
        }
        const guildName = toGuildName(channel.guild);
        const channelName = channel.name ?? channel.id;
        return `${guildName}#${ZERO_WIDTH_SPACE}${channelName}`;
    }
    return undefined;
}
