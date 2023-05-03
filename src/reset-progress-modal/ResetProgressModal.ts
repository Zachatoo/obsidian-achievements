import { App, Modal } from "obsidian";
import settingsStore from "src/settings";
import ResetProgressModalComponent from "./ResetProgressModal.svelte";

export class ResetProgressModal extends Modal {
	component: ResetProgressModalComponent;

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		this.component = new ResetProgressModalComponent({
			target: this.contentEl,
			props: {
				close: () => this.close(),
				closeAndReset: () => this.closeAndReset(),
			},
		});
	}

	async closeAndReset() {
		settingsStore.reset();
		this.close();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
