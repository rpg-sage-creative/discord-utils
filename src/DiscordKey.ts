import { isNilSnowflake, isNonNilSnowflake, orNilSnowflake, type NIL_SNOWFLAKE, type Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/type-utils";
import type { DGuildChannel, DInteraction, DMessage, DMessageChannel, DReaction } from "./types.js";
import { MessageReference } from "discord.js";

interface IHasSnowflakeId { id:Snowflake; }
type TSnowflakeResolvable = string | IHasSnowflakeId;

export class DiscordKey {

	public server: Snowflake;
	public channel: Snowflake;
	public thread: Snowflake;
	public message: Snowflake;

	public isDm: boolean;
	public isEmpty: boolean;
	public isValid: boolean;
	public key: string;
	public shortKey: string;

	public hasServer: boolean;
	public hasChannel: boolean;
	public hasThread: boolean;
	public hasMessage: boolean;

	public constructor(
		server: Optional<TSnowflakeResolvable>,
		channel: Optional<TSnowflakeResolvable>,
		thread?: Optional<TSnowflakeResolvable>,
		message?: Optional<TSnowflakeResolvable>
	) {
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
		}else if (this.hasThread) {
			this.shortKey = DiscordKey.createKey(this.server, this.thread);
		}else {
			this.shortKey = DiscordKey.createKey(this.server, this.channel);
		}
	}

	/** Returns the thread if it has one. Returns the channel otherwise. */
	public get threadOrChannel(): Snowflake {
		return this.hasThread ? this.thread : this.channel;
	}
	public get channelAndThread(): { channel:Snowflake|null; thread:Snowflake|null } {
		return {
			channel: this.hasChannel ? this.channel : null,
			thread: this.hasThread ? this.thread : null
		};
	}
	public get user(): Snowflake | null {
		return this.isDm ? this.channel : null;
	}

	public toString(): string { return this.key; }

	public toChannelUrl(): string {
		const server = this.hasServer ? this.server : "@me";
		return `https://discord.com/channels/${server}/${this.threadOrChannel}`;
	}
	public toMessageUrl(): string | null {
		if (this.hasMessage) {
			const server = this.hasServer ? this.server : "@me";
			return `https://discord.com/channels/${server}/${this.threadOrChannel}/${this.message}`;
		}
		return null;
	}
	public toUrl(): string {
		return this.toMessageUrl() ?? this.toChannelUrl();
	}

	public static createKey(...resolvables: Optional<TSnowflakeResolvable>[]): string {
		return resolvables.map(DiscordKey.resolveId).join("-");
	}

	public static fromChannel(channel: DMessageChannel): DiscordKey {
		const guildId = (channel as DGuildChannel).guild?.id;
		if (channel.isThread()) {
			const threadId = channel.id;
			const channelId = channel.parent?.id;
			return new DiscordKey(guildId, channelId, threadId);
		}
		return new DiscordKey(guildId, channel.id);
	}

	public static fromInteraction(interaction: DInteraction): DiscordKey {
		const channel = interaction.channel;
		if (channel?.isThread()) {
			const threadId = channel.id;
			const channelId = channel.parent?.id;
			return new DiscordKey(interaction.guildId, channelId, threadId);
		}
		return new DiscordKey(interaction.guildId, interaction.channelId);
	}

	public static fromMessage(message: DMessage): DiscordKey {
		const channel = message.channel;
		const guildId = (channel as DGuildChannel).guild?.id;
		if (channel.isThread()) {
			const threadId = channel.id;
			const channelId = channel.parent?.id;
			return new DiscordKey(guildId, channelId, threadId, message.id);
		}
		return new DiscordKey(guildId, message.channel.id, null, message.id);
	}

	public static fromMessageReaction(messageReaction: DReaction): DiscordKey {
		return DiscordKey.fromMessage(messageReaction.message as DMessage);
	}

	/** Resolves to a nonNilSnowflake or NIL_SNOWFLAKE. */
	public static resolveId(resolvable: Optional<TSnowflakeResolvable>): Snowflake | NIL_SNOWFLAKE {
		return orNilSnowflake(typeof(resolvable) === "string" ? resolvable : resolvable?.id);
	}

	public static toMessageUrl(msgOrRef: DMessage | MessageReference): string {
		if ("messageId" in msgOrRef) {
			return new DiscordKey(msgOrRef.guildId, msgOrRef.channelId, null, msgOrRef.messageId).toUrl();
		}
		return DiscordKey.fromMessage(msgOrRef).toUrl();
	}
}
