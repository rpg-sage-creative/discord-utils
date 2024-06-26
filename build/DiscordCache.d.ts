import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import { Client, Guild, GuildMember, Message, Role, User, Webhook, type AnyThreadChannel, type Channel } from "discord.js";
import { DiscordKey } from "./DiscordKey.js";
import { type CanBeChannelIdResolvable, type ChannelIdResolvable } from "./resolve/resolveChannelId.js";
import { type CanBeGuildIdResolvable, type GuildIdResolvable } from "./resolve/resolveGuildId.js";
import { type CanBeRoleIdResolvable } from "./resolve/resolveRoleId.js";
import { type CanBeUserIdResolvable } from "./resolve/resolveUserId.js";
import { type MessageChannel, type NonThreadChannel } from "./types/types.js";
type ClientGuildResolvable = Guild | {
    client: Client;
    guild: Optional<Guild>;
};
type ChannelAndThread = {
    channel?: NonThreadChannel;
    thread?: AnyThreadChannel;
};
type WebhookOptions = {
    avatar?: string;
    name?: string;
    type?: "dialog";
};
export declare class DiscordCache {
    #private;
    client: Client;
    guild?: Optional<Guild>;
    constructor(client: Client, guild?: Optional<Guild>, channel?: Optional<Channel>);
    /** Clears the cache/maps in an attempt to avoid memory leaks. */
    clear(): void;
    fetchChannel<T extends Channel = Channel>(resolvable: Optional<CanBeChannelIdResolvable>, isDm?: true): Promise<T | undefined>;
    fetchChannelAndThread(resolvable: Optional<CanBeChannelIdResolvable>): Promise<ChannelAndThread>;
    fetchGuild(resolvable: Optional<CanBeGuildIdResolvable>): Promise<Guild | undefined>;
    fetchGuildName(resolvable: Optional<CanBeGuildIdResolvable>, defaultValue?: string): Promise<string>;
    fetchGuildMember(resolvable: Optional<CanBeUserIdResolvable>): Promise<GuildMember | undefined>;
    fetchGuildMemberRole(userId: Snowflake, roleId: Snowflake): Promise<Role | undefined>;
    fetchMessage(discordKey: DiscordKey): Promise<Message | undefined>;
    fetchGuildRole(roleIdResolvable: Optional<CanBeRoleIdResolvable>): Promise<Role | undefined>;
    fetchUser(userIdResolvable: Optional<CanBeUserIdResolvable>): Promise<User | undefined>;
    private webhookMap;
    fetchWebhook(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable, options?: WebhookOptions): Promise<Webhook | undefined>;
    private fetchWebhookChannel;
    /**
     * Reusable code to check and log when we don't have permissions.
     * Logging is done here, once, because this is sometimes called twice in fetchOrCreateWebhook.
     */
    private hasManageWebhooksPerm;
    fetchOrCreateWebhook(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable, options?: WebhookOptions): Promise<Webhook | undefined>;
    findLastWebhookMessageByAuthor(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable, webhookOptions: WebhookOptions, filter: (authorName: string, index: number, messages: Message[]) => Promise<unknown>): Promise<Message | undefined>;
    static filterChannelMessages(channel: MessageChannel, filter: (message: Message, index: number, messages: Message[]) => Promise<unknown>, lastMessageId?: Snowflake, limit?: number): Promise<Message[]>;
    static from(guildResolvable: ClientGuildResolvable): DiscordCache;
    static from(client: Client, guildIdResolvable: GuildIdResolvable): Promise<DiscordCache>;
    private static SAGE_ID;
    static getSageId(): `${number}`;
    static setSageId(id: Snowflake): void;
}
export {};
