import { App, PluginSettingTab, Setting } from "obsidian";
import AchievementsPlugin from "./main";
import { SEEDED_ACHIEVEMENTS } from "./seededAchievements";
import { DEFAULT_SETTINGS } from "./settings";

export class AchievementsSettingTab extends PluginSettingTab {
	plugin: AchievementsPlugin;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Achievements Plugin Settings" });

		new Setting(containerEl)
			.setName("Reset progress")
			.setDesc("Resets all achievement progress. THIS CANNOT BE UNDONE.")
			.addButton((component) => {
				component
					.setButtonText("Reset")
					.setWarning()
					.onClick(async () => {
						this.plugin.settings = DEFAULT_SETTINGS;
						await this.plugin.saveSettings();
					});
			});

		containerEl.createEl("h2", { text: "Achievements List" });

		SEEDED_ACHIEVEMENTS.forEach((achievement) => {
			const progressEl = document.createElement("progress", {});
			progressEl.value = this.plugin.settings[achievement.type];
			progressEl.max = achievement.requiredOccurenceCount;

			new Setting(containerEl)
				.setName(achievement.name)
				.setDesc(achievement.description)
				.settingEl.appendChild(progressEl);
		});
	}
}
