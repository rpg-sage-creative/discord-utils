module.exports = function(globalConfig, projectConfig) {
	return new Promise((resolve, reject) => {
		const intents = [
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
		];
		const client = new Client({ intents });

		captureProcessExit(() => client?.destroy());

		client.once("ready", async () => {
			client.user?.setPresence({ status:"online" });
			client.user?.setActivity("RPG Sage run tests ...", { type:ActivityType.Watching });
			globalConfig.client = client;
			resolve();
		});
		client.login(readFileSync("./config/token.txt").toString("utf-8"), reject);

	});
}