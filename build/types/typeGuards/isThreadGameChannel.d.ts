import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, ChannelType, PrivateThreadChannel, PublicThreadChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
export type PublicThreadGameChannel = PublicThreadChannel & {
    type: ChannelType.PublicThread;
};
/** Channels Sage can check notpermissions in. */
export type ThreadGameChannel = PublicThreadGameChannel | PrivateThreadChannel;
export declare function isThreadGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is ThreadGameChannel;
