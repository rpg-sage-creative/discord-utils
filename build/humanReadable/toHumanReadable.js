import { toChannelName } from "./toChannelName.js";
import { toGuildMemberName } from "./toGuildMemberName.js";
import { toGuildName } from "./toGuildName.js";
import { toUserName } from "./toUserName.js";
import { toWebhookName } from "./toWebhookName.js";
import { toRoleName } from "./toRoleName.js";
export function toHumanReadable(target) {
    if (target) {
        // Webhook
        if ("token" in target) {
            return toWebhookName(target);
        }
        // GuildMember or User or UserPartial
        if ("createDM" in target) {
            if ("user" in target) {
                return toGuildMemberName(target);
            }
            else {
                return toUserName(target);
            }
        }
        // APIUser or PartialRecipient
        if ("username" in target) {
            return toUserName(target);
        }
        // Message or PartialMessage
        if ("channel" in target) {
            return toChannelName(target);
        }
        // Guild or GuildPreview
        if ("discoverySplash" in target) {
            return toGuildName(target);
        }
        if ("mentionable" in target) {
            return toRoleName(target);
        }
        // Channel
        return toChannelName(target);
    }
    return undefined;
}
