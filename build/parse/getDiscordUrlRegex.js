import { getOrCreateRegex } from "@rsc-utils/core-utils";
import { regex } from "regex";
const ChannelUrlRegExp = regex `
	# base
	https://discord\.com/channels/

	# guildId
	( @me | \g<snowflake> )

	/

	# channelId
	\g<snowflake>

	# not followed by a messageId
	(?! [\/\d] )


	(?(DEFINE)
		(?<snowflake> \d{16,} )
	)
`;
const ChannelUrlCaptureRegExp = regex `
	# base
	https://discord\.com/channels/

	# guildId
	(?<guildId> @me | \g<snowflake> )

	/

	# channelId
	(?<channelId> \g<snowflake> )

	# not followed by a messageId
	(?! [\/\d] )


	(?(DEFINE)
		(?<snowflake> \d{16,} )
	)
`;
const MessageUrlRegExp = regex `
	# base
	https://discord\.com/channels/

	# guildId
	( @me | \g<snowflake> )

	/

	# channelId
	\g<snowflake>

	/

	# messageId
	\g<snowflake>


	(?(DEFINE)
		(?<snowflake> \d{16,} )
	)
`;
const MessageUrlCaptureRegExp = regex `
	# base
	https://discord\.com/channels/

	# guildId
	(?<guildId> @me | \g<snowflake> )

	/

	# channelId
	(?<channelId> \g<snowflake> )

	/

	# messageId
	(?<messageId> \g<snowflake> )


	(?(DEFINE)
		(?<snowflake> \d{16,} )
	)
`;
function flagRegex(regexp, flags) {
    let newFlags = regexp.flags;
    flags.split("").forEach(flag => newFlags = newFlags.replace(flag, "") + flag);
    return new RegExp(regexp, newFlags);
}
function createDiscordUrlRegex(options) {
    const { capture, gFlag = "", iFlag = "", type = "message" } = options ?? {};
    const flags = `${gFlag}${iFlag}`;
    switch (type) {
        case "channel":
            return capture
                ? flagRegex(ChannelUrlCaptureRegExp, flags)
                : flagRegex(ChannelUrlRegExp, flags);
        case "message":
            return capture
                ? flagRegex(MessageUrlCaptureRegExp, flags)
                : flagRegex(MessageUrlRegExp, flags);
    }
}
export function getDiscordUrlRegex(options) {
    return getOrCreateRegex(createDiscordUrlRegex, options);
}
