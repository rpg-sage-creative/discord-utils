import { NIL_SNOWFLAKE, errorReturnFalse, isNonNilSnowflake } from "@rsc-utils/core-utils";
import { Client, DMChannel, Guild, GuildMember, Message, Role, User, Webhook } from "discord.js";
import { DiscordApiError } from "./DiscordApiError.js";
import { DiscordKey } from "./DiscordKey.js";
import { getPermsFor } from "./permissions/getPermsFor.js";
import { resolveChannelReference } from "./resolve/resolveChannelReference.js";
import { resolveGuildId } from "./resolve/resolveGuildId.js";
import { resolveRoleId } from "./resolve/resolveRoleId.js";
import { resolveUserId } from "./resolve/resolveUserId.js";
import { isMessageTarget } from "./types/typeGuards/isMessageTarget.js";
import { isNonThreadChannel } from "./types/typeGuards/isNonThreadChannel.js";
import { isThreadChannel } from "./types/typeGuards/isThreadChannel.js";
import { isWebhookChannel } from "./types/typeGuards/isWebhookChannel.js";
const SageDialogWebhookName = "SageDialogWebhookName";
function createWebhookKey(channelReferenceResolvable, name) {
    const channelId = resolveChannelReference(channelReferenceResolvable);
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
        this.#cached.clear();
        this.webhookMap.clear();
    }
    async fetchChannel(resolvable) {
        const { guildId, channelId } = resolveChannelReference(resolvable) ?? {};
        if (!channelId || !guildId)
            return undefined;
        const guild = await this.fetchGuild(guildId);
        if (!guild)
            return undefined;
        const cache = this.#cached.has(channelId);
        const channel = await guild.channels.fetch(channelId, { cache, force: !cache }).catch(DiscordApiError.process);
        this.#cached.set(channelId, true);
        return channel ?? undefined;
    }
    async fetchDmChannel({ userId, channelId }) {
        const user = await this.fetchUser(userId);
        if (!user)
            return undefined;
        if (user.dmChannel?.id !== channelId)
            return undefined;
        const cache = this.#cached.has(channelId);
        const channel = await user.dmChannel.fetch(!cache).catch(DiscordApiError.process);
        this.#cached.set(channelId, true);
        return channel;
    }
    async fetchChannelAndThread(resolvable) {
        const threadOrChannel = await this.fetchChannel(resolvable);
        if (isThreadChannel(threadOrChannel)) {
            const parentChannel = await this.fetchChannel(threadOrChannel.parent);
            return { channel: parentChannel, thread: threadOrChannel };
        }
        if (isNonThreadChannel(threadOrChannel)) {
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
    async fetchMessage(keyOrReference, userId) {
        const discordKey = keyOrReference instanceof DiscordKey ? keyOrReference : DiscordKey.from(keyOrReference);
        const { messageId } = discordKey;
        if (!isNonNilSnowflake(messageId))
            return undefined;
        const cache = this.#cached.has(messageId);
        const channel = discordKey.isDm && userId
            ? await this.fetchDmChannel({ userId, channelId: discordKey.channelId })
            : await this.fetchChannel(discordKey);
        const message = isMessageTarget(channel)
            ? await channel.messages.fetch({ message: messageId, cache, force: !cache }).catch(DiscordApiError.process)
            : undefined;
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
    async fetchWebhook(channelReferenceResolvable, options) {
        const channel = await this.fetchWebhookChannel(channelReferenceResolvable);
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
    async fetchWebhookChannel(channelReferenceResolvable) {
        const { guildId, channelId } = resolveChannelReference(channelReferenceResolvable);
        if (!isNonNilSnowflake(guildId) || !isNonNilSnowflake(channelId))
            return undefined;
        const { channel } = await this.fetchChannelAndThread({ guildId, channelId });
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
    async fetchOrCreateWebhook(channelReferenceResolvable, options) {
        const existing = await this.fetchWebhook(channelReferenceResolvable, options);
        if (existing)
            return existing;
        const channel = await this.fetchWebhookChannel(channelReferenceResolvable);
        if (!this.hasManageWebhooksPerm(channel))
            return undefined;
        if (!isThreadChannel(channel)) {
            const webhookName = options?.name ?? SageDialogWebhookName;
            const webhookArgs = { ...options, name: webhookName };
            const webhook = await channel.createWebhook(webhookArgs).catch(DiscordApiError.process);
            const key = createWebhookKey(channel, webhookName);
            this.webhookMap.set(key, webhook ?? undefined);
            return webhook;
        }
        return undefined;
    }
    async findLastWebhookMessageByAuthor(channelReferenceResolvable, webhookOptions, filter) {
        const webhook = await this.fetchWebhook(channelReferenceResolvable, webhookOptions);
        if (!webhook)
            return undefined;
        const channel = await this.fetchWebhookChannel(channelReferenceResolvable);
        if (!channel)
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
