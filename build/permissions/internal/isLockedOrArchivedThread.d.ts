import type { SupportedChannel, SupportedThreadChannel } from "../../types/typeGuards/isSupported.js";
export declare function isLockedOrArchivedThread(channel: SupportedChannel): channel is SupportedThreadChannel;
