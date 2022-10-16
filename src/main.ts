import { Notice, Plugin, TAbstractFile } from "obsidian";
import { DEFAULT_SETTINGS, Settings } from "./settings";
import { AchievementsSettingTab } from "./SettingsTab";
import { AchievementType, SEEDED_ACHIEVEMENTS } from "./seededAchievements";

export default class AchievementsPlugin extends Plugin {
	settings: Settings;

	async onload() {
		console.log("loading Achievements plugin");

		await this.loadSettings();

		this.registerEvent(
			this.app.metadataCache.on("changed", (file, data, cache) =>
				this.handleFileCreateUpdateDelete(file)
			)
		);

		this.registerEvent(
			this.app.metadataCache.on("deleted", (file, prevCache) =>
				this.handleFileCreateUpdateDelete(file)
			)
		);

		this.addSettingTab(new AchievementsSettingTab(this.app, this));
	}

	onunload() {
		console.log("unloading Achievements plugin");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async handleFileCreateUpdateDelete(file: TAbstractFile) {
		const currFileCount = file.vault.getMarkdownFiles().length;
		let type: AchievementType | undefined;

		if (currFileCount > this.settings.noteCount) {
			this.settings.notesCreated += 1;
			type = "notesCreated";
		}
		if (currFileCount < this.settings.noteCount) {
			this.settings.notesDeleted += 1;
			type = "notesDeleted";
		}

		if (!type) {
			return;
		}

		this.settings.noteCount = currFileCount;

		await this.getNewAchievementMaybe(type);
	}

	async getNewAchievementMaybe(type: AchievementType) {
		const newAchievement = SEEDED_ACHIEVEMENTS.find(
			(achievement) =>
				achievement.type === type &&
				this.settings[type] >= achievement.requiredOccurenceCount &&
				!this.settings.achievedAchievementIDs.includes(achievement.id)
		);
		if (newAchievement) {
			this.settings.achievedAchievementIDs.push(newAchievement.id);
			new Notice(`${newAchievement.name}\n${newAchievement.description}`);
		}
		await this.saveSettings();
	}
}
