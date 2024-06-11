import type { Optional } from "@rsc-utils/core-utils";
import { EmbedBuilder as _EmbedBuilder } from "discord.js";

export class EmbedBuilder extends _EmbedBuilder {
	public appendDescription(appendix?: Optional<string>) {
		if (this.data.description && appendix) {
			this.setDescription(this.data.description + appendix);
		}else if (appendix) {
			this.setDescription(appendix);
		}
	}
}