import type { Optional } from "@rsc-utils/core-utils";
import type { Webhook } from "discord.js";
/** Returns the webhook name as a readable value or "$UnknownWebhook" */
export declare function toWebhookName(webhook: Optional<Webhook>): string;
