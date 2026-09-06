import { IntentsBitField } from "discord.js";
import { readFileSync } from "fs";
import { defineConfig } from "vitest/config";


export default defineConfig({
  test: {
	provide: {
		// token for Sage to connect to Discord
		token: readFileSync("./config/token.txt").toString("utf-8"),

		// snowflakes for things we use to test DiscordCache
		ids: JSON.parse(readFileSync("./config/ids.json").toString("utf-8")),

		// the intents flags for connecting to Discord
		intents: [
			IntentsBitField.Flags.Guilds,
			IntentsBitField.Flags.GuildMembers,
			IntentsBitField.Flags.GuildModeration,
			// IntentsBitField.Flags.GuildBans <-- deprecated
			IntentsBitField.Flags.GuildEmojisAndStickers,
			// IntentsBitField.Flags.GuildIntegrations
			IntentsBitField.Flags.GuildWebhooks,
			IntentsBitField.Flags.GuildInvites,
			// IntentsBitField.Flags.GuildVoiceStates,
			IntentsBitField.Flags.GuildPresences,
			IntentsBitField.Flags.GuildMessages,
			IntentsBitField.Flags.GuildMessageReactions,
			// IntentsBitField.Flags.GuildMessageTyping,
			IntentsBitField.Flags.DirectMessages,
			IntentsBitField.Flags.DirectMessageReactions,
			// IntentsBitField.Flags.DirectMessageTyping,
			IntentsBitField.Flags.MessageContent,
			IntentsBitField.Flags.GuildScheduledEvents,
			// IntentsBitField.Flags.AutoModerationConfiguration,
			// IntentsBitField.Flags.AutoModerationExecution,
			IntentsBitField.Flags.GuildMessagePolls,
			IntentsBitField.Flags.DirectMessagePolls,
		]
	  },
	},
});
