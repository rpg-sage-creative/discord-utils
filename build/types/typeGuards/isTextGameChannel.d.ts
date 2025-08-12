import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
import type { ThreadGameChannel } from "./isThreadGameChannel.js";
/** Channels Sage can send messages to. */
export type TextGameChannel = TextChannel | ThreadGameChannel;
export declare function isTextGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is TextGameChannel;
