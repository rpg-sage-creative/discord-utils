import type { Optional } from "@rsc-utils/core-utils";
import type { AnyThreadChannel, Channel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
/** Channels Sage can send messages to. */
export type TextGameChannel = TextChannel | AnyThreadChannel;
export declare function isTextGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is TextGameChannel;
