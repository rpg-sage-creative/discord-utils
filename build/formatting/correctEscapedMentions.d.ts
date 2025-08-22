type Options = {
    emoji?: boolean;
    roles?: boolean;
    users?: boolean;
};
/** Looks for text escaped with ` characters that contain emoji (:die: or <:die:12345> or <@1234567890123456> or <@&1234567890123456>) and unescapes them so they render correctly. */
export declare function correctEscapedMentions(value: string, options: Options): string;
export {};
