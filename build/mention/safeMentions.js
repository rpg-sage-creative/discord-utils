import { ZERO_WIDTH_SPACE } from "@rsc-utils/core-utils";
export function safeMentions(content) {
    return content
        ? content.replace(/@(here|everyone)/gi, (_, tag) => `@${ZERO_WIDTH_SPACE}${tag}`)
        : content;
}
