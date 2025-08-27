import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import { Client, DMChannel, Guild, GuildMember, Message, Role, User, Webhook, type Channel } from "discord.js";
import { DiscordKey } from "./DiscordKey.js";
import { type CanBeChannelReferenceResolvable, type ChannelReferenceResolvable } from "./resolve/resolveChannelReference.js";
import { type CanBeGuildIdResolvable, type GuildIdResolvable } from "./resolve/resolveGuildId.js";
import { type CanBeRoleIdResolvable } from "./resolve/resolveRoleId.js";
import { type CanBeUserIdResolvable } from "./resolve/resolveUserId.js";
import { type SupportedChannel, type SupportedNonThreadChannel, type SupportedThreadChannel, type SupportedWebhookChannel } from "./types/typeGuards/isSupported.js";
import type { MessageReferenceOrPartial } from "./types/types.js";
type ClientGuildResolvable = Guild | {
    client: Client;
    guild: Optional<Guild>;
};
type ChannelAndThread = {
    channel?: SupportedNonThreadChannel;
    thread?: SupportedThreadChannel;
};
type WebhookAndChannel = {
    webhook?: Webhook;
    channel?: SupportedWebhookChannel;
    hasPerms?: boolean;
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
    private constructor();
    /** Clears the cache/maps in an attempt to avoid memory leaks. */
    clear(): void;
    fetchChannel<T extends Channel = Channel>(resolvable: Optional<CanBeChannelReferenceResolvable>): Promise<T | undefined>;
    fetchSupportedChannel<T extends SupportedChannel = SupportedChannel>(resolvable: Optional<CanBeChannelReferenceResolvable>): Promise<T | undefined>;
    fetchDmChannel({ userId, channelId }: {
        userId: Snowflake;
        channelId: Snowflake;
    }): Promise<DMChannel | undefined>;
    fetchChannelAndThread(resolvable: Optional<CanBeChannelReferenceResolvable>): Promise<ChannelAndThread>;
    fetchGuild(resolvable: Optional<CanBeGuildIdResolvable>): Promise<Guild | undefined>;
    fetchGuildName(resolvable: Optional<CanBeGuildIdResolvable>, defaultValue?: string): Promise<string>;
    fetchGuildMember(resolvable: Optional<CanBeUserIdResolvable>): Promise<GuildMember | undefined>;
    fetchGuildMemberRole(userId: Snowflake, roleId: Snowflake): Promise<Role | undefined>;
    fetchMessage(keyOrReference: DiscordKey | MessageReferenceOrPartial, userId?: Snowflake): Promise<Message | undefined>;
    fetchGuildRole(roleIdResolvable: Optional<CanBeRoleIdResolvable>): Promise<Role | undefined>;
    fetchUser(userIdResolvable: Optional<CanBeUserIdResolvable>): Promise<User | undefined>;
    private webhookMap;
    fetchWebhookAndChannel(channelReferenceResolvable: ChannelReferenceResolvable, options?: WebhookOptions): Promise<WebhookAndChannel>;
    fetchWebhook(channelReferenceResolvable: ChannelReferenceResolvable, options?: WebhookOptions): Promise<Webhook | undefined>;
    private fetchWebhookChannelAndThread;
    private fetchWebhookChannel;
    /**
     * Reusable code to check and log when we don't have permissions.
     * Logging is done here, once, because this is sometimes called twice in fetchOrCreateWebhook.
     */
    private hasManageWebhooksPerm;
    fetchOrCreateWebhook(channelReferenceResolvable: ChannelReferenceResolvable, options?: WebhookOptions): Promise<Webhook | undefined>;
    static from(guildResolvable: ClientGuildResolvable): DiscordCache;
    static from(client: Client, guildIdResolvable: GuildIdResolvable): Promise<DiscordCache>;
    private static SAGE_ID;
    static getSageId(): `${number}`;
    static setSageId(id: Snowflake): void;
}
export {};
