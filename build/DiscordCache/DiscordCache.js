import { NIL_SNOWFLAKE, debug, errorReturnFalse, isNonNilSnowflake } from "@rsc-utils/core-utils";
import { Client, Guild, GuildMember, Message, Role, User, Webhook } from "discord.js";
import { DiscordApiError } from "../DiscordApiError.js";
import { DiscordKey } from "../DiscordKey.js";
import { getPermsFor } from "../permissions/getPermsFor.js";
import { resolveChannelGuildId } from "../resolve/internal/resolveChannelGuildId.js";
import { resolveChannelId } from "../resolve/resolveChannelId.js";
import { resolveGuildId } from "../resolve/resolveGuildId.js";
import { resolveRoleId } from "../resolve/resolveRoleId.js";
import { resolveUserId } from "../resolve/resolveUserId.js";
import { isMessageTarget, isNonThread, isThread, isWebhookChannel } from "../types/types.js";
const SageDialogWebhookName = "SageDialogWebhookName";
function createWebhookKey(channelIdResolvable, name) {
    const channelId = resolveChannelId(channelIdResolvable);
    return `${channelId}-${name}`;
}
export class DiscordCache {
    client;
    guild;
    #cached;
    constructor(client, guild, channel) {
        this.client = client;
        this.guild = guild;
        this.#cached = new Map();
        this.webhookMap = new Map();
        if (guild) {
            this.#cached.set(guild.id, true);
        }
        if (channel) {
            this.#cached.set(channel.id, true);
        }
    }
    clear() {
        debug("Clearing DiscordCache");
        this.#cached.clear();
        this.webhookMap.clear();
    }
    async fetchChannel(resolvable) {
        const channelId = resolveChannelId(resolvable);
        if (!isNonNilSnowflake(channelId))
            return undefined;
        const guildId = resolveChannelGuildId(resolvable);
        if (guildId) {
            const guild = await this.fetchGuild(guildId);
            return guild?.channels?.cache.get(channelId);
        }
        const user = await this.fetchUser(channelId);
        return user?.dmChannel ?? undefined;
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
    async fetchGuild(resolvable) {
        const guildId = resolveGuildId(resolvable);
        if (!isNonNilSnowflake(guildId))
            return undefined;
        const cache = this.#cached.has(guildId);
        const guild = await this.client.guilds.fetch({ guild: guildId, cache, force: !cache }).catch(DiscordApiError.process);
        this.#cached.set(guildId, true);
        return guild;
    }
    async fetchGuildName(resolvable, defaultValue) {
        const guildId = resolveGuildId(resolvable);
        if (!isNonNilSnowflake(guildId))
            return defaultValue ?? "ERROR_FETCHING_GUILD";
        const cache = this.#cached.has(guildId);
        const guild = await this.client.guilds.fetch({ guild: guildId, cache, force: !cache }).catch(DiscordApiError.process);
        const guildPreview = guild ? undefined : await this.client.fetchGuildPreview(guildId).catch(DiscordApiError.process);
        this.#cached.set(guildId, true);
        return guild?.name ?? guildPreview?.name ?? defaultValue ?? "ERROR_FETCHING_GUILD";
    }
    async fetchGuildMember(resolvable) {
        if (!this.guild)
            return undefined;
        const userId = resolveUserId(resolvable);
        if (!userId)
            return undefined;
        const key = `${this.guild.id}-${userId}`;
        const cache = this.#cached.has(key);
        const guildMember = await this.guild?.members.fetch({ user: userId, cache, force: !cache }).catch(DiscordApiError.process);
        this.#cached.set(key, true);
        return guildMember;
    }
    async fetchGuildMemberRole(userId, roleId) {
        const guildMember = await this.fetchGuildMember(userId);
        return guildMember?.roles.cache.get(roleId);
    }
    async fetchMessage(discordKey) {
        const { messageId } = discordKey;
        if (!isNonNilSnowflake(messageId))
            return undefined;
        const cache = this.#cached.has(messageId);
        const channel = await this.fetchChannel(discordKey);
        const message = isMessageTarget(channel) ? await channel.messages.fetch({ message: messageId, cache, force: !cache }) : undefined;
        this.#cached.set(messageId, true);
        return message;
    }
    async fetchGuildRole(roleIdResolvable) {
        const roleId = resolveRoleId(roleIdResolvable);
        if (!isNonNilSnowflake(roleId))
            return undefined;
        const cache = this.#cached.has(roleId);
        const role = await this.guild?.roles.fetch(roleId, { cache, force: !cache }).catch(DiscordApiError.process);
        this.#cached.set(roleId, true);
        return role ?? undefined;
    }
    async fetchUser(userIdResolvable) {
        const userId = resolveUserId(userIdResolvable);
        if (!isNonNilSnowflake(userId))
            return undefined;
        const cache = this.#cached.has(userId);
        const user = await this.client.users.fetch(userId, { cache, force: !cache }).catch(DiscordApiError.process);
        this.#cached.set(userId, true);
        return user;
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
        if (!isNonNilSnowflake(guildId) || !isNonNilSnowflake(channelId))
            return undefined;
        const discordKey = new DiscordKey(guildId, channelId);
        const { channel } = await this.fetchChannelAndThread(discordKey);
        return isWebhookChannel(channel) ? channel : undefined;
    }
    hasManageWebhooksPerm(channel) {
        if (!channel)
            return false;
        const key = `${channel.id}-canManageWebhooks`;
        if (!this.#cached.has(key)) {
            const { canManageWebhooks } = getPermsFor(channel, DiscordCache.getSageId());
            this.#cached.set(key, canManageWebhooks);
        }
        return this.#cached.get(key) === true;
    }
    async fetchOrCreateWebhook(guildIdResolvable, channelIdResolvable, options) {
        const existing = await this.fetchWebhook(guildIdResolvable, channelIdResolvable, options);
        if (existing)
            return existing;
        const channel = await this.fetchWebhookChannel(guildIdResolvable, channelIdResolvable);
        if (!this.hasManageWebhooksPerm(channel))
            return undefined;
        if (!isThread(channel)) {
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
        if (!channel)
            return [];
        const before = lastMessageId ?? channel.lastMessageId ?? undefined;
        const cache = true;
        if (!limit)
            limit = 25;
        const options = { before, cache, limit };
        const collection = await channel.messages.fetch(options).catch(DiscordApiError.process);
        if (!collection)
            return [];
        const array = Array.from(collection.values());
        if (!filter)
            return array;
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
            const discordCache = new DiscordCache(client);
            return discordCache.fetchGuild(guildId).then(guild => {
                discordCache.guild = guild;
                return discordCache;
            });
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
