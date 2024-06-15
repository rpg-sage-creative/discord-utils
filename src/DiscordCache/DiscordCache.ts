import type { Awaitable, Optional, Snowflake } from "@rsc-utils/core-utils";
import { NIL_SNOWFLAKE, debug, errorReturnFalse, info, isNonNilSnowflake } from "@rsc-utils/core-utils";
import { Client, DMChannel, Guild, GuildMember, GuildPreview, Message, Role, User, Webhook, type AnyThreadChannel, type Channel, type GuildBasedChannel } from "discord.js";
import { DiscordApiError } from "../DiscordApiError.js";
import { DiscordKey } from "../DiscordKey.js";
import { toHumanReadable } from "../humanReadable/toHumanReadable.js";
import { getPermsFor } from "../permissions/getPermsFor.js";
import { resolveChannelGuildId } from "../resolve/internal/resolveChannelGuildId.js";
import { resolveChannelId, type CanBeChannelIdResolvable, type ChannelIdResolvable } from "../resolve/resolveChannelId.js";
import { resolveGuildId, type CanBeGuildIdResolvable, type GuildIdResolvable } from "../resolve/resolveGuildId.js";
import { resolveRoleId, type RoleIdResolvable } from "../resolve/resolveRoleId.js";
import { resolveUserId, type UserIdResolvable } from "../resolve/resolveUserId.js";
import { isMessageTarget, isNonThread, isThread, isWebhookChannel, type MessageChannel, type NonThreadChannel, type WebhookChannel } from "../types/types.js";
import { fetchGuild } from "./internal/fetchGuild.js";

//#region Helpers

const SageDialogWebhookName = "SageDialogWebhookName";

type ClientGuildResolvable = Guild
	| { client: Client; guild: Optional<Guild>; };

type ChannelAndThread = { channel?:NonThreadChannel; thread?:AnyThreadChannel; };

type WebhookOptions = { avatar?:string; name?:string; type?:"dialog" };

function createWebhookKey(channelIdResolvable: ChannelIdResolvable, name: string): string {
	const channelId = resolveChannelId(channelIdResolvable);
	return `${channelId}-${name}`;
}


//#endregion

export class DiscordCache {
	public constructor(public client: Client, public guild: Optional<Guild>, channel?: Optional<Channel>) {
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
			this.channelMap.set(channel.id as Snowflake, channel);
		}
		if (guild) {
			this.guildMap.set(guild.id as Snowflake, guild);
		}
	}

	/** Clears the cache/maps in an attempt to avoid memory leaks. */
	public clear(): void {
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

	//#region channel

	private channelMap: Map<string, Channel | undefined>;

	public async fetchChannel<T extends Channel = Channel>(resolvable: Optional<CanBeChannelIdResolvable>): Promise<T | undefined> {
		const channelId = resolveChannelId(resolvable);
		if (!channelId) return undefined; //NOSONAR

		if (!this.channelMap.has(channelId)) {
			const guildId = resolveChannelGuildId(resolvable);
			const channel = guildId
				? await this.fetchTextChannel(guildId, channelId)
				: await this.fetchDmChannel(channelId);
			this.channelMap.set(channelId, channel as T);
		}
		return this.channelMap.get(channelId) as T;
	}

	public async fetchChannelAndThread(resolvable: Optional<CanBeChannelIdResolvable>): Promise<ChannelAndThread> {
		const threadOrChannel = await this.fetchChannel(resolvable);
		if (isThread(threadOrChannel)) {
			const parentChannel = await this.fetchChannel<NonThreadChannel>(threadOrChannel.parentId);
			return { channel:parentChannel, thread:threadOrChannel };
		}
		if (isNonThread(threadOrChannel)) {
			return { channel:threadOrChannel };
		}
		return { };
	}

	private async fetchDmChannel(userId: Snowflake): Promise<DMChannel | undefined> {
		const user = await this.fetchUser(userId);
		return user?.dmChannel ?? undefined;
	}

	private async fetchTextChannel(guildId: Snowflake, channelId: Snowflake): Promise<GuildBasedChannel | undefined> {
		const guild = await this.fetchGuild(guildId);
		return guild?.channels?.cache.get(channelId);
	}

	//#endregion

	//#region guild

	private guildMap: Map<Snowflake, Guild | undefined>;

	public async fetchGuild(resolvable: Optional<CanBeGuildIdResolvable>): Promise<Guild | undefined> {
		const guildId = resolveGuildId(resolvable);
		if (!guildId) return undefined; //NOSONAR

		if (!this.guildMap.has(guildId)) {
			const guild = await fetchGuild(this.client, guildId);
			this.guildMap.set(guildId, guild);
		}
		return this.guildMap.get(guildId);
	}

	//#endregion

	//#region guild preview

	private guildPreviewMap: Map<Snowflake, GuildPreview | undefined>;

	public async fetchGuildName(resolvable: Optional<CanBeGuildIdResolvable>, defaultValue?: string): Promise<string> {
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

	//#endregion

	//#region guild member

	private guildMemberMap: Map<Snowflake, GuildMember | undefined>;

	public async fetchGuildMember(resolvable: Optional<UserIdResolvable>): Promise<GuildMember | undefined> {
		const userId = resolveUserId(resolvable);
		if (!userId) return undefined; //NOSONAR

		if (!this.guildMemberMap.has(userId)) {
			const guildMember = await this.guild?.members.fetch({ user:userId, cache:true, force:true }).catch(DiscordApiError.process);
			this.guildMemberMap.set(userId, guildMember ?? undefined);
		}
		return this.guildMemberMap.get(userId) ?? undefined;
	}

	//#endregion

	//#region guild member role

	private guildMemberRoleMap: Map<string, Role | undefined>;

	public async fetchGuildMemberRole(userId: Snowflake, roleId: Snowflake): Promise<Role | undefined> {
		const key = `${userId}-${roleId}`;
		if (!this.guildMemberRoleMap.has(key)) {
			const guildMember = await this.fetchGuildMember(userId);
			const role = guildMember?.roles.cache.get(roleId);
			this.guildMemberRoleMap.set(key, role);
		}
		return this.guildMemberRoleMap.get(key);
	}

	//#endregion

	//#region message

	private messageMap: Map<Snowflake, Message | undefined>;

	public async fetchMessage(discordKey: DiscordKey): Promise<Message | undefined> {
		const { messageId } = discordKey;
		if (!messageId) return undefined; //NOSONAR

		if (!this.messageMap.has(messageId)) {
			const channel = await this.fetchChannel(discordKey);
			const message = isMessageTarget(channel) ? await channel.messages.fetch({ message:messageId, cache:true, force:true }) : undefined;
			this.messageMap.set(messageId, message);
		}
		return this.messageMap.get(messageId);
	}

	//#endregion

	//#region role

	private roleMap: Map<Snowflake, Role | undefined>;

	public async fetchGuildRole(roleIdResolvable: Optional<RoleIdResolvable>): Promise<Role | undefined> {
		const roleId = resolveRoleId(roleIdResolvable);
		if (!roleId) return undefined; //NOSONAR

		if (!this.roleMap.has(roleId)) {
			const role = await this.guild?.roles.fetch(roleId, { cache:true, force:true }).catch(DiscordApiError.process);
			this.roleMap.set(roleId, role ?? undefined);
		}
		return this.roleMap.get(roleId);
	}

	//#endregion

	//#region user

	private userMap: Map<Snowflake, User | undefined>;

	public async fetchUser(userIdResolvable: Optional<UserIdResolvable>): Promise<User | undefined> {
		const userId = resolveUserId(userIdResolvable);
		if (!userId) return undefined; //NOSONAR
		if (!this.userMap.has(userId) && isNonNilSnowflake(userId)) {
			const user = await this.client.users.fetch(userId, { cache:true, force:true }).catch(DiscordApiError.process);
			this.userMap.set(userId, user);
		}
		return this.userMap.get(userId);
	}

	//#endregion

	//#region webhook

	private webhookMap: Map<string, Webhook | undefined>;

	public async fetchWebhook(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable, options?: WebhookOptions): Promise<Webhook | undefined> {
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

	private async fetchWebhookChannel(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable): Promise<WebhookChannel | undefined> {
		const guildId = resolveGuildId(guildIdResolvable);
		const channelId = resolveChannelId(channelIdResolvable);
		if (!guildId || !channelId) return undefined; // NOSONAR

		const discordKey = new DiscordKey(guildId, channelId);
		const { channel } = await this.fetchChannelAndThread(discordKey)
		return isWebhookChannel(channel) ? channel : undefined;
	}

	//#endregion

	private manageWebhooksPermMap: Map<Snowflake, Optional<boolean>>;
	/**
	 * Reusable code to check and log when we don't have permissions.
	 * Logging is done here, once, because this is sometimes called twice in fetchOrCreateWebhook.
	 */
	private hasManageWebhooksPerm(channel: Optional<WebhookChannel>): channel is WebhookChannel {
		if (!channel) return false; // NOSONAR

		const channelId = channel.id as Snowflake;
		if (!this.manageWebhooksPermMap.has(channelId)) {
			const { canManageWebhooks } = getPermsFor(channel, DiscordCache.getSageId());
			if (!canManageWebhooks) {
				info(`Cannot ManageWebhooks: ${toHumanReadable(channel)}`);
			}
			this.manageWebhooksPermMap.set(channelId, canManageWebhooks);
		}
		return this.manageWebhooksPermMap.get(channelId) === true;
	}

	public async fetchOrCreateWebhook(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable, options?: WebhookOptions): Promise<Webhook | undefined> {
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
			const webhookArgs = { ...options, name:webhookName };
			const webhook = await channel.createWebhook(webhookArgs).catch(DiscordApiError.process);
			const key = createWebhookKey(channel, webhookName);
			this.webhookMap.set(key, webhook ?? undefined);
			return webhook;
		}

		return undefined;
	}

	public async findLastWebhookMessageByAuthor(guildIdResolvable: GuildIdResolvable, channelIdResolvable: ChannelIdResolvable, webhookOptions: WebhookOptions, filter: (authorName: string, index: number, messages: Message[]) => Promise<unknown>): Promise<Message | undefined> {
		const webhook = await this.fetchWebhook(guildIdResolvable, channelIdResolvable, webhookOptions);
		if (!webhook) return undefined; // NOSONAR

		const discordKey = new DiscordKey(webhook.guildId, channelIdResolvable);
		const channel = await this.fetchChannel(discordKey);
		if (!isMessageTarget(channel)) return undefined; // NOSONAR

		const options = {
			before: channel.lastMessageId ?? undefined,
			limit: 25,
			cache: true
		};
		const collection = await channel.messages.fetch(options).catch(DiscordApiError.process);
		if (!collection) return undefined; // NOSONAR

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

	public static async filterChannelMessages(channel: MessageChannel, filter: (message: Message, index: number, messages: Message[]) => Promise<unknown>, lastMessageId?: Snowflake, limit?: number): Promise<Message[]> {
		if (!channel) {
			return [];
		}
		const options = {
			before: <string>lastMessageId ?? channel.lastMessageId,
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
		const filtered: Message[] = [];
		for (let i = 0, message = array[i]; i < array.length; i++, message = array[i]) {
			if (await filter(message, i, array).catch(errorReturnFalse)) {
				filtered.push(message);
			}
		}
		return filtered;
	}

	public static from(guildResolvable: ClientGuildResolvable): Promise<DiscordCache>;
	public static from(client: Client, guildIdResolvable: GuildIdResolvable): DiscordCache;
	public static from(...args: (Client | ClientGuildResolvable | GuildIdResolvable)[]): Awaitable<DiscordCache> {
		// handle client/guildIdResolvable
		if (args.length === 2) {
			const client = args[0] as Client;
			const guildId = resolveGuildId(args[1] as GuildIdResolvable);
			return fetchGuild(client, guildId).then(guild => new DiscordCache(client, guild));
		}

		// handle channel, interaction, message, etc
		const guildResolvable = args[0] as ClientGuildResolvable;
		if ("guild" in guildResolvable) {
			return new DiscordCache(guildResolvable.client, guildResolvable.guild);
		}

		// handle guild
		return new DiscordCache(guildResolvable.client, guildResolvable);
	}

	private static SAGE_ID: Snowflake = NIL_SNOWFLAKE;
	public static getSageId() { return DiscordCache.SAGE_ID; }
	public static setSageId(id: Snowflake) { DiscordCache.SAGE_ID = id; }
}
