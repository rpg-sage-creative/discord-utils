import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, Message } from "discord.js";
/** Returns the name of the channel as a readable reference. */
export declare function toChannelName(channel: Optional<Channel | Message>): string | undefined;
/** Returns the name of the message's channel as a readable reference. */
export declare function toChannelName(message: Optional<Message>): string | undefined;
