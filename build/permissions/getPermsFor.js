import { canCheckPermissionsFor, canFetchWebhooksFor, isGuildBased } from "../typeChecks.js";
export function getPermsFor(channel, memberOrRole, ...checked) {
    const memberId = typeof (memberOrRole) === "string" ? memberOrRole : memberOrRole?.id;
    if (!memberId || !isGuildBased(channel)) {
        return { canManageChannel: false, canManageWebhooks: false, canViewChannel: false, isInChannel: false, canSendMessages: false, canAddReactions: false, canSendWebhooks: false };
    }
    const isThread = channel.isThread();
    const channelWithPerms = isThread ? channel.parent : channel;
    if (!canCheckPermissionsFor(channelWithPerms)) {
        return { canManageChannel: false, canManageWebhooks: false, canViewChannel: false, isInChannel: false, canSendMessages: false, canAddReactions: false, canSendWebhooks: false };
    }
    const perms = channelWithPerms?.permissionsFor(memberId);
    const canManageChannel = perms?.has("MANAGE_CHANNELS") ?? false;
    const canManageWebhooks = perms?.has("MANAGE_WEBHOOKS") ?? false;
    const canViewChannel = perms?.has("VIEW_CHANNEL") ?? false;
    const isInChannel = isThread ? channel.guildMembers.has(memberId) : channel.members.has(memberId);
    const canSendMessages = perms?.has(isThread ? "SEND_MESSAGES_IN_THREADS" : "SEND_MESSAGES") ?? false;
    const canAddReactions = perms?.has("ADD_REACTIONS") ?? false;
    const canSendWebhooks = canManageWebhooks && canFetchWebhooksFor(channelWithPerms);
    if (arguments.length < 3) {
        return { canManageChannel, canManageWebhooks, canViewChannel, isInChannel, canSendMessages, canAddReactions, canSendWebhooks };
    }
    const missing = perms ? checked.filter(perm => !perms.has(perm)) : checked.slice();
    const present = perms ? checked.filter(perm => perms.has(perm)) : [];
    return {
        canManageChannel,
        canManageWebhooks,
        canViewChannel,
        isInChannel,
        canSendMessages,
        canAddReactions,
        canSendWebhooks,
        checked,
        missing,
        present,
    };
}
