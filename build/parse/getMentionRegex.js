import { globalizeRegex } from "@rsc-utils/core-utils";
const ChannelMentionRegExp = (/<#(?<channelId>\d{16,})>/);
const ChannelMentionRegExpG = globalizeRegex(ChannelMentionRegExp);
const RoleMentionRegExp = (/<@&(?<roleId>\d{16,})>/);
const RoleMentionRegExpG = globalizeRegex(RoleMentionRegExp);
const UserMentionRegExp = (/<@\!?(?<userId>\d{16,})>/);
const UserMentionRegExpG = globalizeRegex(UserMentionRegExp);
export function getMentionRegex(type, global) {
    if (global) {
        if (type === "channel")
            return ChannelMentionRegExpG;
        if (type === "role")
            return RoleMentionRegExpG;
        return UserMentionRegExpG;
    }
    if (type === "channel")
        return ChannelMentionRegExp;
    if (type === "role")
        return RoleMentionRegExp;
    return UserMentionRegExp;
}
