import { ZERO_WIDTH_SPACE } from "@rsc-utils/string-utils";
function channelToName(channel) {
    if (channel) {
        if ("guild" in channel) {
            const guildName = channel.guild?.name ?? channel.guildId ?? "UnknownGuild";
            const channelName = channel.name ?? channel.id;
            return `${guildName}#${ZERO_WIDTH_SPACE}${channelName}`;
        }
        if (channel.recipient) {
            return userToMention(channel.recipient);
        }
        return `#${ZERO_WIDTH_SPACE}${channel.id}`;
    }
    return null;
}
function messageToChannelName(message) {
    const author = userToMention(message.author);
    if (message.guild) {
        return channelToName(message.channel) + author;
    }
    else {
        return author;
    }
}
function userToMention(user) {
    if (user) {
        if ("displayName" in user && user.displayName) {
            return `@${ZERO_WIDTH_SPACE}${user.displayName}`;
        }
        const discriminator = (user.discriminator ?? "0") !== "0" ? `#${user.discriminator}` : ``;
        return `@${ZERO_WIDTH_SPACE}${user.username}${discriminator}`;
    }
    return "@UnknownUser";
}
function memberToMention(member) {
    if (member) {
        if (member.nickname) {
            return `@${ZERO_WIDTH_SPACE}${member.nickname}`;
        }
        return userToMention(member.user);
    }
    return "@UnknownMember";
}
function webhookToName(webhook) {
    if (webhook) {
        if (webhook.sourceGuild) {
            return `${webhook.sourceGuild.name}$${webhook.name}`;
        }
        if (webhook.owner) {
            return `${userToMention(webhook.owner)}$${webhook.name}`;
        }
        return `$${webhook.name}`;
    }
    return "$UnknownWebhook";
}
export function toHumanReadable(target) {
    if (target) {
        if ("token" in target) {
            return webhookToName(target);
        }
        if ("createDM" in target) {
            if ("user" in target) {
                return memberToMention(target);
            }
            else {
                return userToMention(target);
            }
        }
        if ("channel" in target) {
            return messageToChannelName(target);
        }
        return channelToName(target);
    }
    return null;
}
