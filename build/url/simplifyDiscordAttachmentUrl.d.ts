import type { Optional } from "@rsc-utils/core-utils";
/**
 * Assists in comparing discord attachment image urls.
 * Removes querystring from links grabbed from the web (usually width/height).
 * Changes media.discordapp.net to cdn.discordapp.com.
 */
export declare function simplifyDiscordAttachmentUrl(url: string): string;
export declare function simplifyDiscordAttachmentUrl(url: Optional<string>): Optional<string>;
