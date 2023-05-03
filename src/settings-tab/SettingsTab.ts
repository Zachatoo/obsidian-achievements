import { App, PluginSettingTab } from "obsidian";
import type AchievementsPlugin from "src/main";
import { ResetProgressModal } from "src/reset-progress-modal/ResetProgressModal";
import SettingsTabComponent from "./SettingsTab.svelte";

export class AchievementsSettingTab extends PluginSettingTab {
	component: SettingsTabComponent;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.component = new SettingsTabComponent({
			target: containerEl,
			props: {
				openResetModal: () => this.openResetModal(),
			},
		});
	}

	openResetModal() {
		new ResetProgressModal(this.app).open();
	}
}
