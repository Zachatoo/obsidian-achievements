import { App, PluginSettingTab, Setting } from "obsidian";
import AchievementsPlugin from "./main";
import { ResetProgressModal } from "./ResetProgressModal";
import { SEEDED_ACHIEVEMENTS } from "./seededAchievements";

export class AchievementsSettingTab extends PluginSettingTab {
	plugin: AchievementsPlugin;

	constructor(app: App, plugin: AchievementsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

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

		containerEl.createEl("h2", { text: "Danger Zone" });

		new Setting(containerEl)
			.setName("Reset progress")
			.setDesc("Resets all achievement progress. THIS CANNOT BE UNDONE.")
			.addButton((component) => {
				component
					.setButtonText("Reset")
					.setWarning()
					.onClick(async () => {
						new ResetProgressModal(this.app, this.plugin).open();
					});
			});
	}
}
