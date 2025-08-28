import type { PermissionFlagsBits } from "discord.js";
type PermFlagBitsKeys = keyof typeof PermissionFlagsBits;
type PermReasonKeys = "ManageChannels" | "ManageRoles" | "RunGame" | "GameMaster" | "Player";
/** Gets the set of permissions required for a given reason. */
export declare function getRequiredPermissions(reason: PermReasonKeys): readonly PermFlagBitsKeys[];
export {};
