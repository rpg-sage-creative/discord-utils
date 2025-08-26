import type { Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { SupportedChannel } from "./isSupportedChannel.js";
import { type SupportedParentChannel } from "./isSupportedParentChannel.js";
type HasSupportedParentChannel = SupportedChannel & {
    parent: SupportedParentChannel;
};
export declare function hasSupportedParentChannel(channel: Optional<Channel>): channel is HasSupportedParentChannel;
export {};
