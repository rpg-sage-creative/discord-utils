import type { Optional } from "@rsc-utils/core-utils";
import { type AnyThreadChannel, type CategoryChannel, type Channel, type ForumChannel, type TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
/** These are the only channels Sage should function in. */
export type GameChannel = TextChannel | AnyThreadChannel | ForumChannel | CategoryChannel;
export declare function isGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is GameChannel;
