import { PermissionFlagsBits } from "discord.js";
import { resolveSnowflake } from "../resolve/resolveSnowflake.js";
import { canCheckPermissionsFor, canFetchWebhooksFor, isGuildBased, isThread as isThreadChannel } from "../types/typeChecks.js";
import {} from "../types/types.js";
function emptyResults() {
    return {
        canManageChannel: false,
        canManageWebhooks: false,
        canViewChannel: false,
        isInChannel: false,
        canSendMessages: false,
        canAddReactions: false,
        canSendWebhooks: false,
        canSendPolls: false
    };
}
export function getPermsFor(channel, memberOrRole, ...checked) {
    const memberOrRoleId = resolveSnowflake(memberOrRole);
    if (!memberOrRoleId || !isGuildBased(channel)) {
        return emptyResults();
    }
    const isThread = isThreadChannel(channel);
    const channelWithPerms = isThread ? channel.parent : channel;
    if (!canCheckPermissionsFor(channelWithPerms)) {
        return emptyResults();
    }
    const perms = channelWithPerms?.permissionsFor(memberOrRoleId);
    const canManageChannel = perms?.has(PermissionFlagsBits.ManageChannels) ?? false;
    const canManageWebhooks = perms?.has(PermissionFlagsBits.ManageWebhooks) ?? false;
    const canViewChannel = perms?.has(PermissionFlagsBits.ViewChannel) ?? false;
    const isInChannel = isThread ? channel.guildMembers.has(memberOrRoleId) : channel.members.has(memberOrRoleId);
    const canSendMessages = perms?.has(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) ?? false;
    const canAddReactions = perms?.has(PermissionFlagsBits.AddReactions) ?? false;
    const canSendWebhooks = canManageWebhooks && canFetchWebhooksFor(channelWithPerms);
    const webhookChannel = canSendWebhooks ? channelWithPerms : undefined;
    const canSendPolls = perms?.has(PermissionFlagsBits.SendPolls) ?? false;
    if (arguments.length < 3) {
        return { canManageChannel, canManageWebhooks, canViewChannel, isInChannel, canSendMessages, canAddReactions, canSendWebhooks, webhookChannel, canSendPolls };
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
        canSendPolls,
        checked,
        missing,
        present,
    };
}
