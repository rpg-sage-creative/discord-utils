import { PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { resolveSnowflake } from "../resolve/resolveSnowflake.js";
import { isSupportedWebhookChannel } from "../types/typeGuards/isSupported.js";
class Permissions {
    checked;
    isInChannel;
    isThread;
    missing;
    perms;
    present;
    webhookChannel;
    constructor({ checked, isInChannel, isThread, missing, perms, present, webhookChannel } = {}) {
        this.checked = checked ?? [];
        this.isInChannel = isInChannel ?? false;
        this.isThread = isThread ?? false;
        this.missing = missing ?? [];
        this.perms = perms ?? undefined;
        this.present = present ?? [];
        this.webhookChannel = webhookChannel ?? undefined;
    }
    can(key) {
        if (key === "SendTo") {
            return this.isThread ? this.can("SendMessagesInThreads") : this.can("SendMessages");
        }
        if (key === "WebhookTo") {
            return this.can("ManageWebhooks") && this.webhookChannel !== undefined;
        }
        return this.perms?.has(key) ?? false;
    }
}
export function getPermsFor(channel, memberOrRole, ...checked) {
    const memberOrRoleId = resolveSnowflake(memberOrRole);
    if (!memberOrRoleId || !channel || channel.isDMBased()) {
        return new Permissions();
    }
    const isThread = channel.isThread();
    const channelWithPerms = isThread ? channel.parent : channel;
    if (!channelWithPerms || channelWithPerms.isDMBased()) {
        return new Permissions();
    }
    const perms = channelWithPerms?.permissionsFor(memberOrRoleId);
    const isInChannel = isThread ? channel.guildMembers.has(memberOrRoleId) : channel.members.has(memberOrRoleId);
    const webhookChannel = isSupportedWebhookChannel(channelWithPerms) ? channelWithPerms : undefined;
    if (arguments.length < 3) {
        return new Permissions({ isInChannel, isThread, perms, webhookChannel });
    }
    const missing = perms ? checked.filter(perm => !perms.has(perm)) : checked.slice();
    const present = perms ? checked.filter(perm => perms.has(perm)) : [];
    return new Permissions({ checked, isInChannel, isThread, missing, perms, present, webhookChannel });
}
