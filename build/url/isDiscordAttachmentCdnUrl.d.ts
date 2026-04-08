/**
 * Discord attachment cdn urls include timeout information.
 * They did this to avoid discord being used as a file share.
 * It creates an issue when folks use attached images for things like character tokens because ...
 * ... the map engine uses a standard http GET and often gets a 404 from these cdn images.
 */
export declare function isDiscordAttachmentCdnUrl(value: string): boolean;
