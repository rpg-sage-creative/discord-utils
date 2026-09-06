import { error } from "@rsc-utils/core-utils";
import { ActionRow, Attachment, AttachmentBuilder, Message, Webhook } from "discord.js";
import { DiscordApiError } from "./DiscordApiError.js";
import { splitMessageOptions } from "./messageOptions/splitMessageOptions.js";
export async function sendTo(sendArgs, splitOptions, catchHandler) {
    const { avatarURL, components, content, embedContent, embeds, files, replyingTo, sageCache, target, threadId, username } = sendArgs;
    // if we can check permissions then let's do so first
    const canTest = target && ("permissionsFor" in target);
    const canSend = canTest ? await sageCache.canSendMessageToChannel(target) : true;
    if (canTest && !canSend) {
        /** @todo do i warn() here or am i doing it elsewhere? */
        return Promise.resolve(undefined);
    }
    // check for a user post type override
    const contentToEmbeds = splitOptions.contentToEmbeds === true || sageCache.user.sagePostType === 0; //DialogPostType.Embed;
    const embedsToContent = splitOptions.embedsToContent === true || sageCache.user.sagePostType === 1; //DialogPostType.Post;
    // create post length safe payloads
    const payloads = splitMessageOptions({ avatarURL, components, content, embedContent, embeds, files, replyingTo, threadId, username }, { ...splitOptions, contentToEmbeds, embedsToContent });
    const catcher = catchHandler
        ? (reason) => { DiscordApiError.process(reason) ? void 0 : catchHandler(reason); return undefined; } // NOSONAR
        : (reason) => { const apiErr = DiscordApiError.from(reason); if (!apiErr)
            error(reason); return apiErr; }; // NOSONAR
    const results = [];
    for (const payload of payloads) {
        const message = await target.send(payload).catch(catcher);
        if (message || !catchHandler) {
            results.push(message);
        }
        else {
            // let's stop sending if we have an error (which is most likely a username issue)
            break;
        }
    }
    return results;
}
