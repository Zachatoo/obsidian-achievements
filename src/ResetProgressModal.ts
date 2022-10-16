import { App, Modal } from "obsidian";
import AchievementsPlugin from "./main";

export class ResetProgressModal extends Modal {
	plugin: AchievementsPlugin;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		let { contentEl } = this;
		contentEl.createEl("h2", { text: "Reset Progress" });
		contentEl.createEl("p", {
			text: "Resets all achievement progress. THIS CANNOT BE UNDONE.",
		});
		contentEl.createEl("p", {
			text: "Are you sure you want to continue?",
		});

		const buttonContainerEl = contentEl.createEl("div", {
			cls: "achievements-plugin__reset-modal__button-container",
		});

		const cancelBtn = buttonContainerEl.createEl("button", {
			text: "Cancel",
		});
		cancelBtn.on("click", "button", () => {
			this.close();
		});

		const confirmBtn = buttonContainerEl.createEl("button", {
			text: "Reset",
			cls: "mod-warning",
		});
		confirmBtn.on("click", "button", async () => {
			await this.plugin.resetSettings();
			this.close();
		});
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
