import type { Optional, OrNull, OrUndefined } from "@rsc-utils/core-utils";
import type { MessageReaction, User } from "discord.js";
import type { MessageOrPartial, ReactionOrPartial, SMessage, UserOrPartial } from "../types/types.js";
export declare function fetchIfPartial(value: MessageOrPartial): Promise<SMessage>;
export declare function fetchIfPartial(value: ReactionOrPartial): Promise<MessageReaction>;
export declare function fetchIfPartial(value: UserOrPartial): Promise<User>;
export declare function fetchIfPartial(value: OrUndefined<MessageOrPartial>): Promise<OrUndefined<SMessage>>;
export declare function fetchIfPartial(value: OrUndefined<ReactionOrPartial>): Promise<OrUndefined<MessageReaction>>;
export declare function fetchIfPartial(value: OrUndefined<UserOrPartial>): Promise<OrUndefined<User>>;
export declare function fetchIfPartial(value: OrNull<MessageOrPartial>): Promise<OrNull<SMessage>>;
export declare function fetchIfPartial(value: OrNull<ReactionOrPartial>): Promise<OrNull<MessageReaction>>;
export declare function fetchIfPartial(value: OrNull<UserOrPartial>): Promise<OrNull<User>>;
export declare function fetchIfPartial(value: Optional<MessageOrPartial>): Promise<Optional<SMessage>>;
export declare function fetchIfPartial(value: Optional<ReactionOrPartial>): Promise<Optional<MessageReaction>>;
export declare function fetchIfPartial(value: Optional<UserOrPartial>): Promise<Optional<User>>;
