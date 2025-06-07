import type { Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { MessageOrPartial, MessageReferenceOrPartial } from "../types/types.js";
type ChannelResolvable = Channel | MessageOrPartial | MessageReferenceOrPartial;
export declare function toChannelUrl(ref: ChannelResolvable): string;
export declare function toChannelUrl(ref: Optional<ChannelResolvable>): string | undefined;
export {};
