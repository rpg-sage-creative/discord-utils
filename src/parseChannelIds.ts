import { Snowflake, isNonNilSnowflake, orNilSnowflake } from "@rsc-utils/snowflake-utils";
import { DMessage } from "./types.js";
import { createDiscordUrlRegex } from "./createDiscordUrlRegex.js";
import { Optional } from "@rsc-utils/type-utils";
import { parseSnowflake } from "./parseSnowflake.js";

function contentToUrls(content: Optional<string>): string[] {
	if (content) {
		const regex = createDiscordUrlRegex({globalFlag:true});
		return regex.exec(content) ?? [];
	}
	return [];
}

type TDiscordKey = { server:Snowflake; channel:Snowflake; message:Snowflake; };

function splitUrl(url: string): TDiscordKey {
	const [_http, _slash, _dotCom, _channels, server, channel, message] = url?.split("/") ?? [];
	return {
		server: orNilSnowflake(server),
		channel: orNilSnowflake(channel),
		message: orNilSnowflake(message)
	};
}

export function parseChannelIds(message: DMessage): Snowflake[] {
	const channelMentionIds = message.mentions.channels.map(channel => channel.id);
	const channelUrlIds = contentToUrls(message.content).map(splitUrl).map(url => url.channel);
	const channelReferenceIds = message.content?.match(/<#\d{16,}>/g)?.map(parseSnowflake) as string[] ?? [];
	return channelMentionIds
		.concat(channelUrlIds)
		.concat(channelReferenceIds)
		.filter((id, i, arr) => id && isNonNilSnowflake(id) && arr.indexOf(id) === i)
		;
}