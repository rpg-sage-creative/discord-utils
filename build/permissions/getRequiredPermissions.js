const SageFlagMap = {
    "AddReactions": ["RunGame", "GameMaster", "Player"],
    "Administrator": [],
    "AttachFiles": ["RunGame", "GameMaster", "Player"],
    "BanMembers": [],
    "ChangeNickname": [],
    "Connect": [],
    "CreateEvents": [],
    "CreateGuildExpressions": [],
    "CreateInstantInvite": [],
    "CreatePrivateThreads": [],
    "CreatePublicThreads": [],
    "DeafenMembers": [],
    "EmbedLinks": ["RunGame"],
    "KickMembers": [],
    "ManageChannels": ["ManageChannels"],
    "ManageEmojisAndStickers": [],
    "ManageEvents": [],
    "ManageGuild": [],
    "ManageGuildExpressions": [],
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
    "Speak": [],
    "Stream": [],
    "UseApplicationCommands": [],
    "UseEmbeddedActivities": [],
    "UseExternalApps": [],
    "UseExternalEmojis": ["RunGame"],
    "UseExternalSounds": [],
    "UseExternalStickers": [],
    "UseSoundboard": [],
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
