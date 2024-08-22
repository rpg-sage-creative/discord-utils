import { assert, runTests } from "@rsc-utils/core-utils";
import { parseReference } from "../../build/index.js";

runTests(async function test_parseReference() {

	const channelReferenceMe = { channelId:"1182487240534937610" };
	const channelUrlMe = "https://discord.com/channels/@me/1182487240534937610";
	assert(channelReferenceMe, parseReference, channelUrlMe, "channel");
	assert(undefined, parseReference, channelUrlMe, "message");

	const channelReference = { guildId:"480488957889609733", channelId:"1182487240534937610" };
	const channelUrl = "https://discord.com/channels/480488957889609733/1182487240534937610";
	assert(channelReference, parseReference, channelUrl, "channel");
	assert(undefined, parseReference, channelUrl, "message");

	const messageReferenceMe = { channelId:"1182487240534937610", messageId:"1192628934014140476" };
	const messageUrlMe = "https://discord.com/channels/@me/1182487240534937610/1192628934014140476";
	assert(messageReferenceMe, parseReference, messageUrlMe, "message");
	assert(undefined, parseReference, messageUrlMe, "channel");

	const messageReference = { guildId:"480488957889609733", channelId:"1182487240534937610", messageId:"1192628934014140476" };
	const messageUrl = "https://discord.com/channels/480488957889609733/1182487240534937610/1192628934014140476";
	assert(messageReference, parseReference, messageUrl, "message");
	assert(undefined, parseReference, messageUrl, "channel");

}, true);
