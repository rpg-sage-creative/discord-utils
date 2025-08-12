import type { Optional } from "@rsc-utils/core-utils";
import type { CategoryChannel, Channel, ForumChannel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
import type { ThreadGameChannel } from "./isThreadGameChannel.js";
type HasGameChannelParent = {
    parent: TextChannel | ForumChannel | null;
};
/** These are the only channels Sage should function in. */
export type GameChannel = TextChannel | ForumChannel | CategoryChannel | (ThreadGameChannel & HasGameChannelParent);
export declare function isGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is GameChannel;
export {};
