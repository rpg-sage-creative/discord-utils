import { isNilSnowflake, isNonNilSnowflake, orNilSnowflake } from "@rsc-utils/snowflake-utils";
export class DiscordKey {
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
            channel: this.hasChannel ? this.channel : null,
            thread: this.hasThread ? this.thread : null
        };
    }
    get user() {
        return this.isDm ? this.channel : null;
    }
    toString() { return this.key; }
    toChannelUrl() {
        const server = this.hasServer ? this.server : "@me";
        return `https://discord.com/channels/${server}/${this.threadOrChannel}`;
    }
    toMessageUrl() {
        if (this.hasMessage) {
            const server = this.hasServer ? this.server : "@me";
            return `https://discord.com/channels/${server}/${this.threadOrChannel}/${this.message}`;
        }
        return null;
    }
    toUrl() {
        return this.toMessageUrl() ?? this.toChannelUrl();
    }
    static createKey(...resolvables) {
        return resolvables.map(DiscordKey.resolveId).join("-");
    }
    static fromChannel(channel) {
        const guildId = channel.guild?.id;
        if (channel.isThread()) {
            const threadId = channel.id;
            const channelId = channel.parent?.id;
            return new DiscordKey(guildId, channelId, threadId);
        }
        return new DiscordKey(guildId, channel.id);
    }
    static fromInteraction(interaction) {
        const channel = interaction.channel;
        if (channel?.isThread()) {
            const threadId = channel.id;
            const channelId = channel.parent?.id;
            return new DiscordKey(interaction.guildId, channelId, threadId);
        }
        return new DiscordKey(interaction.guildId, interaction.channelId);
    }
    static fromMessage(message) {
        const channel = message.channel;
        const guildId = channel.guild?.id;
        if (channel.isThread()) {
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
        return orNilSnowflake(typeof (resolvable) === "string" ? resolvable : resolvable?.id);
    }
    static toMessageUrl(msgOrRef) {
        if ("messageId" in msgOrRef) {
            return new DiscordKey(msgOrRef.guildId, msgOrRef.channelId, null, msgOrRef.messageId).toUrl();
        }
        return DiscordKey.fromMessage(msgOrRef).toUrl();
    }
}
