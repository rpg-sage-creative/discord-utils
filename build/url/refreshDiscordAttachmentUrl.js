import { getJson } from "@rsc-utils/io-utils";
const POST_URL = "https://discord.com/api/v9/attachments/refresh-urls";
export async function refreshDiscordAttachmentUrl(url) {
    if (!url)
        return url;
    const postData = { attachment_urls: [url] };
    let error;
    const response = await getJson(POST_URL, postData).catch(err => { error = err; });
    if (!response)
        return Promise.reject(error);
    const refreshed = response.refreshed_urls?.[0]?.refreshed;
    if (!refreshed)
        return Promise.reject("url not refreshed");
    return refreshed;
}
