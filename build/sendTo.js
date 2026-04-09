import { error } from "@rsc-utils/core-utils";
import { ActionRow, Attachment, AttachmentBuilder, Message, Webhook } from "discord.js";
import { DiscordApiError } from "./DiscordApiError.js";
import { splitMessageOptions } from "./messageOptions/splitMessageOptions.js";
export async function sendTo(sendArgs, splitOptions, catchHandler) {
    const { avatarURL, components, content, embedContent, embeds, files, replyingTo, sageCache, target, threadId, username } = sendArgs;
    const canTest = target && ("permissionsFor" in target);
    const canSend = canTest ? await sageCache.canSendMessageToChannel(target) : true;
    if (canTest && !canSend) {
        return Promise.resolve(undefined);
    }
    const contentToEmbeds = splitOptions.contentToEmbeds === true || sageCache.user.sagePostType === 0;
    const embedsToContent = splitOptions.embedsToContent === true || sageCache.user.sagePostType === 1;
    const payloads = splitMessageOptions({ avatarURL, components, content, embedContent, embeds, files, replyingTo, threadId, username }, { ...splitOptions, contentToEmbeds, embedsToContent });
    const catcher = catchHandler
        ? (reason) => { DiscordApiError.process(reason) ? void 0 : catchHandler(reason); return undefined; }
        : (reason) => { const apiErr = DiscordApiError.from(reason); if (!apiErr)
            error(reason); return apiErr; };
    const results = [];
    for (const payload of payloads) {
        const message = await target.send(payload).catch(catcher);
        if (message || !catchHandler) {
            results.push(message);
        }
        else {
            break;
        }
    }
    return results;
}
