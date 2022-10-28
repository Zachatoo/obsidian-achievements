import { App, PluginSettingTab } from "obsidian";
import type AchievementsPlugin from "src/main";
import { ResetProgressModal } from "src/reset-progress-modal/ResetProgressModal";
import SettingsTabComponent from "./SettingsTab.svelte";
import store from "src/store";

export class AchievementsSettingTab extends PluginSettingTab {
	plugin: AchievementsPlugin;
	component: SettingsTabComponent;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		store.plugin.set(this.plugin);

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
		new ResetProgressModal(this.app, this.plugin).open();
	}
}
