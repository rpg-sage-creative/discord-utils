import { isNilSnowflake, isNonNilSnowflake } from "@rsc-utils/core-utils";
import {} from "discord.js";
import { createDiscordUrlRegex } from "./parse/createDiscordUrlRegex.js";
import { resolveSnowflake } from "./resolve/resolveSnowflake.js";
import { isGuildBased, isThread } from "./types/typeChecks.js";
import {} from "./types/types.js";
import { toChannelUrl } from "./url/toChannelUrl.js";
import { toMessageUrl } from "./url/toMessageUrl.js";
export class DiscordKey {
    get guildId() {
        return this.hasServer ? this.server : undefined;
    }
    get channelId() {
        return this.threadOrChannel;
    }
    get messageId() {
        return this.hasMessage ? this.message : undefined;
    }
    server;
    channel;
    thread;
    message;
    isDm;
    isEmpty;
    isValid;
    key;
    shortKey;
    hasServer;
    hasChannel;
    hasThread;
    hasMessage;
    constructor(server, channel, thread, message) {
        this.server = DiscordKey.resolveId(server);
        this.channel = DiscordKey.resolveId(channel);
        this.thread = DiscordKey.resolveId(thread);
        this.message = DiscordKey.resolveId(message);
        this.isDm = isNilSnowflake(this.server);
        this.hasServer = isNonNilSnowflake(this.server);
        this.hasChannel = isNonNilSnowflake(this.channel);
        this.hasThread = isNonNilSnowflake(this.thread);
        this.hasMessage = isNonNilSnowflake(this.message);
        this.isEmpty = !this.hasServer && !this.hasChannel && !this.hasThread && !this.hasMessage;
        this.isValid = (this.isDm && this.hasChannel) || (this.hasServer && (this.hasChannel || this.hasThread || this.hasMessage));
        this.key = DiscordKey.createKey(this.server, this.channel, this.thread, this.message);
        if (this.hasMessage) {
            this.shortKey = DiscordKey.createKey(this.server, this.message);
        }
        else if (this.hasThread) {
            this.shortKey = DiscordKey.createKey(this.server, this.thread);
        }
        else {
            this.shortKey = DiscordKey.createKey(this.server, this.channel);
        }
    }
    get threadOrChannel() {
        return this.hasThread ? this.thread : this.channel;
    }
    get channelAndThread() {
        return {
            channel: this.hasChannel ? this.channel : undefined,
            thread: this.hasThread ? this.thread : undefined
        };
    }
    get user() {
        return this.isDm ? this.channel : undefined;
    }
    toString() { return this.key; }
    toChannelUrl() {
        return toChannelUrl(this);
    }
    toMessageUrl() {
        return toMessageUrl(this);
    }
    toUrl() {
        return this.toMessageUrl() ?? this.toChannelUrl();
    }
    static createKey(...resolvables) {
        return resolvables.map(DiscordKey.resolveId).join("-");
    }
    static fromChannel(channel) {
        const guildId = isGuildBased(channel) ? channel.guildId : undefined;
        if (isThread(channel)) {
            const threadId = channel.id;
            const channelId = channel.parent?.id;
            return new DiscordKey(guildId, channelId, threadId);
        }
        return new DiscordKey(guildId, channel.id);
    }
    static fromInteraction(interaction) {
        const channel = interaction.channel;
        if (isThread(channel)) {
            const threadId = channel.id;
            const channelId = channel.parent?.id;
            return new DiscordKey(interaction.guildId, channelId, threadId);
        }
        return new DiscordKey(interaction.guildId, interaction.channelId);
    }
    static fromMessage(message) {
        const channel = message.channel;
        const guildId = isGuildBased(channel) ? channel.guildId : undefined;
        if (isThread(channel)) {
            const threadId = channel.id;
            const channelId = channel.parent?.id;
            return new DiscordKey(guildId, channelId, threadId, message.id);
        }
        return new DiscordKey(guildId, message.channel.id, null, message.id);
    }
    static fromMessageReaction(messageReaction) {
        return DiscordKey.fromMessage(messageReaction.message);
    }
    static resolveId(resolvable) {
        return resolveSnowflake(resolvable, true);
    }
    static fromUrl(url) {
        const messageMatch = createDiscordUrlRegex("message").exec(url);
        if (messageMatch?.groups) {
            const { guildId, channelId, messageId } = messageMatch.groups;
            return new DiscordKey(guildId, channelId, channelId, messageId);
        }
        const channelMatch = createDiscordUrlRegex("channel").exec(url);
        if (channelMatch?.groups) {
            const { guildId, channelId } = channelMatch.groups;
            return new DiscordKey(guildId, channelId, channelId);
        }
        return undefined;
    }
}
