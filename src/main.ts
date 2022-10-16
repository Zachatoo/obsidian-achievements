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
			this.app.metadataCache.on("changed", (file, _data, _cache) => {
				this.handleFileCreateUpdateDelete(file);
			})
		);

		this.registerEvent(
			this.app.metadataCache.on("deleted", (file, _prevCache) =>
				this.handleFileCreateUpdateDelete(file)
			)
		);

		this.addSettingTab(new AchievementsSettingTab(this.app, this));

		this.settings.noteCount = this.app.vault.getMarkdownFiles().length;
		this.settings.internalLinkCount =
			app.fileManager.getAllLinkResolutions().length;
		await this.saveSettings();
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

	async resetSettings() {
		const currNoteCount = this.app.vault.getMarkdownFiles().length;
		const currInternalLinkCount =
			app.fileManager.getAllLinkResolutions().length;
		this.settings = {
			...DEFAULT_SETTINGS,
			noteCount: currNoteCount,
			internalLinkCount: currInternalLinkCount,
		};
		await this.saveSettings();
	}

	async handleFileCreateUpdateDelete(file: TAbstractFile) {
		const currNoteCount = file.vault.getMarkdownFiles().length;
		const currInternalLinkCount =
			app.fileManager.getAllLinkResolutions().length;

		if (currNoteCount > this.settings.noteCount) {
			this.settings.notesCreated +=
				currNoteCount - this.settings.noteCount;
			this.settings.noteCount = currNoteCount;
			this.getNewAchievementMaybe("notesCreated");
		}
		if (currNoteCount < this.settings.noteCount) {
			this.settings.notesDeleted +=
				this.settings.noteCount - currNoteCount;
			this.settings.noteCount = currNoteCount;
			this.getNewAchievementMaybe("notesDeleted");
		}
		if (currInternalLinkCount > this.settings.internalLinkCount) {
			this.settings.internalLinksCreated +=
				currInternalLinkCount - this.settings.internalLinkCount;
			this.settings.internalLinkCount = currInternalLinkCount;
			this.getNewAchievementMaybe("internalLinksCreated");
		}

		await this.saveSettings();
	}

	getNewAchievementMaybe(type: AchievementType) {
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
	}
}
