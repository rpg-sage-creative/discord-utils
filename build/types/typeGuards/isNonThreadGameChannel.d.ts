import type { Optional } from "@rsc-utils/core-utils";
import type { CategoryChannel, Channel, ForumChannel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
/** Channels Sage can check permissions in. */
export type NonThreadGameChannel = TextChannel | ForumChannel | CategoryChannel;
export declare function isNonThreadGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is NonThreadGameChannel;
