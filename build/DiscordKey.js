import { isNilSnowflake, isNonNilSnowflake } from "@rsc-utils/core-utils";
import { getDiscordUrlRegex } from "./parse/getDiscordUrlRegex.js";
import { resolveSnowflake } from "./resolve/resolveSnowflake.js";
import { isGuildBasedChannel, isMessage, isThreadChannel } from "./types/index.js";
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
    get type() {
        return 0;
    }
    get userId() {
        return this.isDm ? this.channel : undefined;
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
        this.server = resolveSnowflake(server, true);
        this.channel = resolveSnowflake(channel, true);
        this.thread = resolveSnowflake(thread, true);
        this.message = resolveSnowflake(message, true);
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
        return resolvables.map(resolvable => resolveSnowflake(resolvable, true)).join("-");
    }
    static from(resolvable) {
        if ("messageId" in resolvable) {
            return new DiscordKey(resolvable.guildId, resolvable.channelId, undefined, resolvable.messageId);
        }
        if ("message" in resolvable) {
            resolvable = resolvable.message;
        }
        const channel = "channel" in resolvable ? resolvable.channel : resolvable;
        const guildId = isGuildBasedChannel(channel) ? channel.guildId : undefined;
        const messageId = isMessage(resolvable) ? resolvable.id : undefined;
        if (isThreadChannel(channel)) {
            const threadId = channel.id;
            const channelId = channel.parent?.id;
            return new DiscordKey(guildId, channelId, threadId, messageId);
        }
        return new DiscordKey(guildId, channel?.id, undefined, messageId);
    }
    static fromUrl(url) {
        const messageMatch = getDiscordUrlRegex({ type: "message" }).exec(url);
        if (messageMatch?.groups) {
            const { guildId, channelId, messageId } = messageMatch.groups;
            return new DiscordKey(guildId, channelId, channelId, messageId);
        }
        const channelMatch = getDiscordUrlRegex({ type: "channel" }).exec(url);
        if (channelMatch?.groups) {
            const { guildId, channelId } = channelMatch.groups;
            return new DiscordKey(guildId, channelId, channelId);
        }
        return undefined;
    }
}
