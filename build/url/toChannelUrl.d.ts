import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, MessageReference } from "discord.js";
import type { MessageOrPartial } from "../types/types.js";
type ChannelResolvable = Channel | MessageOrPartial | MessageReference;
export declare function toChannelUrl(ref: ChannelResolvable): string;
export declare function toChannelUrl(ref: Optional<ChannelResolvable>): string | undefined;
export {};
