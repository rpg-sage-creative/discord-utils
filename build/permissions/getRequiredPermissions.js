const SageFlagMap = {
    "AddReactions": ["RunGame", "GameMaster", "Player"],
    "Administrator": [],
    "AttachFiles": ["RunGame", "GameMaster", "Player"],
    "BanMembers": [],
    "BypassSlowmode": [],
    "ChangeNickname": [],
    "Connect": [],
    "CreateEvents": [],
    "CreateGuildExpressions": [], /** @todo manage server emoji? */
    "CreateInstantInvite": [], /** @todo for future game postings? */
    "CreatePrivateThreads": ["RunGame"], /** @todo to send secret messages vs ephemeral or dm? */
    "CreatePublicThreads": ["RunGame"], /** @todo for future npc shop keep? */
    "DeafenMembers": [],
    "EmbedLinks": ["RunGame"],
    "KickMembers": [],
    "ManageChannels": ["ManageChannels"],
    "ManageEmojisAndStickers": [], // deprecated -> ManageGuildExpressions
    "ManageEvents": [],
    "ManageGuild": [],
    "ManageGuildExpressions": [], /** @todo manage server emoji? */
    "ManageMessages": ["RunGame"],
    "ManageNicknames": [],
    "ManageRoles": ["ManageRoles"],
    "ManageThreads": ["RunGame"],
    "ManageWebhooks": ["RunGame"],
    "MentionEveryone": [],
    "ModerateMembers": [],
    "MoveMembers": [],
    "MuteMembers": [],
    "PinMessages": ["RunGame"],
    "PrioritySpeaker": [],
    "ReadMessageHistory": ["RunGame", "GameMaster", "Player"],
    "RequestToSpeak": [],
    "SendMessages": ["RunGame", "GameMaster", "Player"],
    "SendMessagesInThreads": ["RunGame", "GameMaster", "Player"],
    "SendPolls": ["RunGame"],
    "SendTTSMessages": [],
    "SendVoiceMessages": [],
    "SetVoiceChannelStatus": [],
    "Speak": [],
    "Stream": [],
    "UseApplicationCommands": [],
    "UseEmbeddedActivities": [],
    "UseExternalApps": [],
    "UseExternalEmojis": ["RunGame"],
    "UseExternalSounds": [], /** @todo for the FUTURE! */
    "UseExternalStickers": [],
    "UseSoundboard": [], /** @todo for the FUTURE (related to UseExternalSounds)! */
    "UseVAD": [],
    "ViewAuditLog": [],
    "ViewChannel": ["ManageChannels", "RunGame", "GameMaster", "Player"],
    "ViewCreatorMonetizationAnalytics": [],
    "ViewGuildInsights": [],
};
const ManageChannelsFlags = Object.keys(SageFlagMap).filter(key => SageFlagMap[key].includes("ManageChannels"));
const ManageRolesFlags = Object.keys(SageFlagMap).filter(key => SageFlagMap[key].includes("ManageRoles"));
const RunGameFlags = Object.keys(SageFlagMap).filter(key => SageFlagMap[key].includes("RunGame"));
const GameMasterFlags = Object.keys(SageFlagMap).filter(key => SageFlagMap[key].includes("GameMaster"));
const PlayerFlags = Object.keys(SageFlagMap).filter(key => SageFlagMap[key].includes("Player"));
/** Gets the set of permissions required for a given reason. */
export function getRequiredPermissions(reason) {
    switch (reason) {
        case "GameMaster": return GameMasterFlags;
        case "ManageChannels": return ManageChannelsFlags;
        case "ManageRoles": return ManageRolesFlags;
        case "Player": return PlayerFlags;
        case "RunGame": return RunGameFlags;
        default: return [];
    }
}
