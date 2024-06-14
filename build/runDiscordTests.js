import { captureProcessExit, getAssertData, info, runTests } from "@rsc-utils/core-utils";
import { ActivityType, Client, IntentsBitField } from "discord.js";
import { readFileSync } from "fs";
function getClientOptions() {
    const intents = [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildScheduledEvents,
        IntentsBitField.Flags.GuildMessagePolls,
        IntentsBitField.Flags.DirectMessagePolls,
    ];
    return { intents };
}
function getToken() {
    return readFileSync("./config/token.txt").toString("utf-8");
}
export async function runDiscordTests(testFn, ...args) {
    const exitOnFail = args.includes(true);
    const token = args.find(arg => typeof (arg) === "string");
    const client = new Client(getClientOptions());
    captureProcessExit(() => {
        info("Destroying Discord.Client");
        return client?.destroy();
    });
    client.once("ready", async () => {
        await runTests(async () => {
            client.user?.setPresence({ status: "online" });
            client.user?.setActivity("RPG Sage run tests ...", { type: ActivityType.Watching });
            info(`Discord.Client.on("ready") [success]`);
            await testFn(client);
            await client.destroy();
        }, false, client);
        if (exitOnFail && getAssertData()?.failed) {
            process.exit(1);
        }
    });
    client.login(token ?? getToken());
}
