import { PermissionFlagsBits } from "discord-api-types/v9";
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
    const canManageChannel = perms?.has(PermissionFlagsBits.ManageChannels) ?? false;
    const canManageWebhooks = perms?.has(PermissionFlagsBits.ManageWebhooks) ?? false;
    const canViewChannel = perms?.has(PermissionFlagsBits.ViewChannel) ?? false;
    const isInChannel = isThread ? channel.guildMembers.has(memberId) : channel.members.has(memberId);
    const canSendMessages = perms?.has(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) ?? false;
    const canAddReactions = perms?.has(PermissionFlagsBits.AddReactions) ?? false;
    const canSendWebhooks = canManageWebhooks && canFetchWebhooksFor(channelWithPerms);
    const webhookChannel = canSendWebhooks ? channelWithPerms : undefined;
    if (arguments.length < 3) {
        return { canManageChannel, canManageWebhooks, canViewChannel, isInChannel, canSendMessages, canAddReactions, canSendWebhooks, webhookChannel };
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
        webhookChannel,
        checked,
        missing,
        present,
    };
}
