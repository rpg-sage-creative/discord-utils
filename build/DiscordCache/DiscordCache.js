import { NIL_SNOWFLAKE, debug, errorReturnFalse, info, isNonNilSnowflake } from "@rsc-utils/core-utils";
import { Client, DMChannel, Guild, GuildMember, GuildPreview, Message, Role, User, Webhook } from "discord.js";
import { DiscordApiError } from "../DiscordApiError.js";
import { DiscordKey } from "../DiscordKey.js";
import { toHumanReadable } from "../humanReadable/toHumanReadable.js";
import { getPermsFor } from "../permissions/getPermsFor.js";
import { resolveChannelGuildId } from "../resolve/internal/resolveChannelGuildId.js";
import { resolveChannelId } from "../resolve/resolveChannelId.js";
import { resolveGuildId } from "../resolve/resolveGuildId.js";
import { resolveRoleId } from "../resolve/resolveRoleId.js";
import { resolveUserId } from "../resolve/resolveUserId.js";
import { isMessageTarget, isNonThread, isThread, isWebhookChannel } from "../types/types.js";
import { fetchGuild } from "./internal/fetchGuild.js";
const SageDialogWebhookName = "SageDialogWebhookName";
function createWebhookKey(channelIdResolvable, name) {
    const channelId = resolveChannelId(channelIdResolvable);
    return `${channelId}-${name}`;
}
export class DiscordCache {
    client;
    guild;
    constructor(client, guild, channel) {
        this.client = client;
        this.guild = guild;
        this.channelMap = new Map();
        this.guildMap = new Map();
        this.guildPreviewMap = new Map();
        this.guildMemberMap = new Map([[NIL_SNOWFLAKE, undefined]]);
        this.guildMemberRoleMap = new Map();
        this.messageMap = new Map();
        this.roleMap = new Map();
        this.userMap = new Map();
        this.webhookMap = new Map();
        this.manageWebhooksPermMap = new Map();
        if (channel) {
            this.channelMap.set(channel.id, channel);
        }
        if (guild) {
            this.guildMap.set(guild.id, guild);
        }
    }
    clear() {
        debug("Clearing DiscordCache");
        this.channelMap.clear();
        this.guildMap.clear();
        this.guildPreviewMap.clear();
        this.guildMemberMap.clear();
        this.guildMemberRoleMap.clear();
        this.messageMap.clear();
        this.roleMap.clear();
        this.userMap.clear();
        this.webhookMap.clear();
        this.manageWebhooksPermMap.clear();
    }
    channelMap;
    async fetchChannel(resolvable) {
        const channelId = resolveChannelId(resolvable);
        if (!channelId)
            return undefined;
        if (!this.channelMap.has(channelId)) {
            const guildId = resolveChannelGuildId(resolvable);
            const channel = guildId
                ? await this.fetchTextChannel(guildId, channelId)
                : await this.fetchDmChannel(channelId);
            this.channelMap.set(channelId, channel);
        }
        return this.channelMap.get(channelId);
    }
    async fetchChannelAndThread(resolvable) {
        const threadOrChannel = await this.fetchChannel(resolvable);
        if (isThread(threadOrChannel)) {
            const parentChannel = await this.fetchChannel(threadOrChannel.parentId);
            return { channel: parentChannel, thread: threadOrChannel };
        }
        if (isNonThread(threadOrChannel)) {
            return { channel: threadOrChannel };
        }
        return {};
    }
    async fetchDmChannel(userId) {
        const user = await this.fetchUser(userId);
        return user?.dmChannel ?? undefined;
    }
    async fetchTextChannel(guildId, channelId) {
        const guild = await this.fetchGuild(guildId);
        return guild?.channels?.cache.get(channelId);
    }
    guildMap;
    async fetchGuild(resolvable) {
        const guildId = resolveGuildId(resolvable);
        if (!guildId)
            return undefined;
        if (!this.guildMap.has(guildId)) {
            const guild = await fetchGuild(this.client, guildId);
            this.guildMap.set(guildId, guild);
        }
        return this.guildMap.get(guildId);
    }
    guildPreviewMap;
    async fetchGuildName(resolvable, defaultValue) {
        const guildId = resolveGuildId(resolvable);
        if (!guildId) {
            return defaultValue ?? "ERROR_FETCHING_GUILD";
        }
        if (this.guildMap.has(guildId)) {
            return this.guildMap.get(guildId)?.name ?? defaultValue ?? "ERROR_FETCHING_GUILD";
        }
        if (!this.guildPreviewMap.has(guildId)) {
            const guildPreview = await this.client.fetchGuildPreview(guildId).catch(DiscordApiError.process);
            this.guildPreviewMap.set(guildId, guildPreview);
        }
        return this.guildPreviewMap.get(guildId)?.name ?? defaultValue ?? "ERROR_FETCHING_GUILD_PREVIEW";
    }
    guildMemberMap;
    async fetchGuildMember(resolvable) {
        const userId = resolveUserId(resolvable);
        if (!userId)
            return undefined;
        if (!this.guildMemberMap.has(userId)) {
            const guildMember = await this.guild?.members.fetch({ user: userId, cache: true, force: true }).catch(DiscordApiError.process);
            this.guildMemberMap.set(userId, guildMember ?? undefined);
        }
        return this.guildMemberMap.get(userId) ?? undefined;
    }
    guildMemberRoleMap;
    async fetchGuildMemberRole(userId, roleId) {
        const key = `${userId}-${roleId}`;
        if (!this.guildMemberRoleMap.has(key)) {
            const guildMember = await this.fetchGuildMember(userId);
            const role = guildMember?.roles.cache.get(roleId);
            this.guildMemberRoleMap.set(key, role);
        }
        return this.guildMemberRoleMap.get(key);
    }
    messageMap;
    async fetchMessage(discordKey) {
        const { messageId } = discordKey;
        if (!messageId)
            return undefined;
        if (!this.messageMap.has(messageId)) {
            const channel = await this.fetchChannel(discordKey);
            const message = isMessageTarget(channel) ? await channel.messages.fetch({ message: messageId, cache: true, force: true }) : undefined;
            this.messageMap.set(messageId, message);
        }
        return this.messageMap.get(messageId);
    }
    roleMap;
    async fetchGuildRole(roleIdResolvable) {
        const roleId = resolveRoleId(roleIdResolvable);
        if (!roleId)
            return undefined;
        if (!this.roleMap.has(roleId)) {
            const role = await this.guild?.roles.fetch(roleId, { cache: true, force: true }).catch(DiscordApiError.process);
            this.roleMap.set(roleId, role ?? undefined);
        }
        return this.roleMap.get(roleId);
    }
    userMap;
    async fetchUser(userIdResolvable) {
        const userId = resolveUserId(userIdResolvable);
        if (!userId)
            return undefined;
        if (!this.userMap.has(userId) && isNonNilSnowflake(userId)) {
            const user = await this.client.users.fetch(userId, { cache: true, force: true }).catch(DiscordApiError.process);
            this.userMap.set(userId, user);
        }
        return this.userMap.get(userId);
    }
    webhookMap;
    async fetchWebhook(guildIdResolvable, channelIdResolvable, options) {
        const channel = await this.fetchWebhookChannel(guildIdResolvable, channelIdResolvable);
        if (!this.hasManageWebhooksPerm(channel)) {
            return undefined;
        }
        const webhookName = options?.name ?? SageDialogWebhookName;
        const webhookKey = createWebhookKey(channel, webhookName);
        if (!this.webhookMap.has(webhookKey)) {
            const webhooksCollection = await channel.fetchWebhooks().catch(DiscordApiError.process);
            const webhook = webhooksCollection?.find(w => w.name === webhookName);
            this.webhookMap.set(webhookKey, webhook);
        }
        return this.webhookMap.get(webhookKey);
    }
    async fetchWebhookChannel(guildIdResolvable, channelIdResolvable) {
        const guildId = resolveGuildId(guildIdResolvable);
        const channelId = resolveChannelId(channelIdResolvable);
        if (!guildId || !channelId)
            return undefined;
        const discordKey = new DiscordKey(guildId, channelId);
        const { channel } = await this.fetchChannelAndThread(discordKey);
        return isWebhookChannel(channel) ? channel : undefined;
    }
    manageWebhooksPermMap;
    hasManageWebhooksPerm(channel) {
        if (!channel)
            return false;
        const channelId = channel.id;
        if (!this.manageWebhooksPermMap.has(channelId)) {
            const { canManageWebhooks } = getPermsFor(channel, DiscordCache.getSageId());
            if (!canManageWebhooks) {
                info(`Cannot ManageWebhooks: ${toHumanReadable(channel)}`);
            }
            this.manageWebhooksPermMap.set(channelId, canManageWebhooks);
        }
        return this.manageWebhooksPermMap.get(channelId) === true;
    }
    async fetchOrCreateWebhook(guildIdResolvable, channelIdResolvable, options) {
        const existing = await this.fetchWebhook(guildIdResolvable, channelIdResolvable, options);
        if (existing) {
            return existing;
        }
        const channel = await this.fetchWebhookChannel(guildIdResolvable, channelIdResolvable);
        if (!this.hasManageWebhooksPerm(channel)) {
            return undefined;
        }
        if (!channel.isThread()) {
            const webhookName = options?.name ?? SageDialogWebhookName;
            const webhookArgs = { ...options, name: webhookName };
            const webhook = await channel.createWebhook(webhookArgs).catch(DiscordApiError.process);
            const key = createWebhookKey(channel, webhookName);
            this.webhookMap.set(key, webhook ?? undefined);
            return webhook;
        }
        return undefined;
    }
    async findLastWebhookMessageByAuthor(guildIdResolvable, channelIdResolvable, webhookOptions, filter) {
        const webhook = await this.fetchWebhook(guildIdResolvable, channelIdResolvable, webhookOptions);
        if (!webhook)
            return undefined;
        const discordKey = new DiscordKey(webhook.guildId, channelIdResolvable);
        const channel = await this.fetchChannel(discordKey);
        if (!isMessageTarget(channel))
            return undefined;
        const options = {
            before: channel.lastMessageId ?? undefined,
            limit: 25,
            cache: true
        };
        const collection = await channel.messages.fetch(options).catch(DiscordApiError.process);
        if (!collection)
            return undefined;
        const webhookId = webhook.id;
        const array = Array.from(collection.values());
        for (let index = 0, length = array.length; index < length; index++) {
            const message = array[index];
            if (message.webhookId === webhookId) {
                const authorName = message.author?.username;
                if (await filter(authorName, index, array)) {
                    return message;
                }
            }
        }
        return undefined;
    }
    static async filterChannelMessages(channel, filter, lastMessageId, limit) {
        if (!channel) {
            return [];
        }
        const options = {
            before: lastMessageId ?? channel.lastMessageId,
            limit: limit || 25,
            cache: true
        };
        const collection = await channel.messages.fetch(options).catch(DiscordApiError.process);
        if (!collection) {
            return [];
        }
        const array = Array.from(collection.values());
        if (!filter) {
            return array;
        }
        const filtered = [];
        for (let i = 0, message = array[i]; i < array.length; i++, message = array[i]) {
            if (await filter(message, i, array).catch(errorReturnFalse)) {
                filtered.push(message);
            }
        }
        return filtered;
    }
    static from(...args) {
        if (args.length === 2) {
            const client = args[0];
            const guildId = resolveGuildId(args[1]);
            return fetchGuild(client, guildId).then(guild => new DiscordCache(client, guild));
        }
        const guildResolvable = args[0];
        if ("guild" in guildResolvable) {
            return new DiscordCache(guildResolvable.client, guildResolvable.guild);
        }
        return new DiscordCache(guildResolvable.client, guildResolvable);
    }
    static SAGE_ID = NIL_SNOWFLAKE;
    static getSageId() { return DiscordCache.SAGE_ID; }
    static setSageId(id) { DiscordCache.SAGE_ID = id; }
}
