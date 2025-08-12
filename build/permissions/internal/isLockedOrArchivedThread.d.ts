import type { Channel } from "discord.js";
import { type ThreadGameChannel } from "../../types/typeGuards/isThreadGameChannel.js";
export declare function isLockedOrArchivedThread(channel: Channel): channel is ThreadGameChannel;
