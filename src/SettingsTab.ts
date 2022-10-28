import { App, PluginSettingTab } from "obsidian";
import type AchievementsPlugin from "./main";
import { ResetProgressModal } from "./ResetProgressModal";
import SettingsTabComponent from "./SettingsTab.svelte";

export class AchievementsSettingTab extends PluginSettingTab {
	plugin: AchievementsPlugin;
	component: SettingsTabComponent;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.component = new SettingsTabComponent({
			target: containerEl,
			props: {
				settings: this.plugin.settings,
				openResetModal: () => this.openResetModal(),
			},
		});
	}

	openResetModal() {
		new ResetProgressModal(this.app, this.plugin).open();
	}
}
