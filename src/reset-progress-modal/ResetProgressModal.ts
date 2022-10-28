import { App, Modal } from "obsidian";
import type AchievementsPlugin from "src/main";
import store from "src/store";
import ResetProgressModalComponent from "./ResetProgressModal.svelte";

export class ResetProgressModal extends Modal {
	plugin: AchievementsPlugin;
	component: ResetProgressModalComponent;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		store.plugin.set(this.plugin);

		this.component = new ResetProgressModalComponent({
			target: this.contentEl,
			props: {
				close: () => this.close(),
				closeAndReset: () => this.closeAndReset(),
			},
		});
	}

	async closeAndReset() {
		await this.plugin.resetSettings();
		this.close();
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
