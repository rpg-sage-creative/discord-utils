import { getJson } from "@rsc-utils/io-utils";

const POST_URL = "https://discord.com/api/v9/attachments/refresh-urls";

type PostData = {
	attachment_urls: string[];
};

type ResponseData = {
	refreshed_urls: { original:string; refreshed:string; }[];
};

/**
 * Attempts to refresh a given discord attachment url.
 */
export async function refreshDiscordAttachmentUrl(url: string): Promise<string> {
	const postData: PostData = { attachment_urls:[url] };

	let error: any;
	const response = await getJson<ResponseData>(POST_URL, postData).catch(err => { error = err; });
	if (!response) return Promise.reject(error);

	const refreshed = response.refreshed_urls[0]?.refreshed;
	if (!refreshed) return Promise.reject("url not refreshed");

	return refreshed;
}