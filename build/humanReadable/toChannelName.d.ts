import type { Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { MessageOrPartial } from "../types/types.js";
/** Returns the name of the channel as a readable reference. */
export declare function toChannelName(channel: Optional<Channel | MessageOrPartial>): string | undefined;
/** Returns the name of the message's channel as a readable reference. */
export declare function toChannelName(message: Optional<MessageOrPartial>): string | undefined;
