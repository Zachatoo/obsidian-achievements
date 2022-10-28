import { Notice, Plugin, TAbstractFile } from "obsidian";
import { DEFAULT_SETTINGS } from "src/settings";
import type { Settings } from "src/settings";
import { AchievementsSettingTab } from "src/settings-tab/SettingsTab";
import { SEEDED_ACHIEVEMENTS } from "src/seededAchievements";
import type { AchievementType } from "src/seededAchievements";
import { onCommandTrigger } from "src/commands";
import store from "./store";

export default class AchievementsPlugin extends Plugin {
	settings: Settings;
	uninstallCommands: Function[] = [];

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

		this.uninstallCommands.push(
			onCommandTrigger("command-palette:open", async () => {
				this.settings.commandPaletteOpened += 1;
				this.getNewAchievementMaybe("commandPaletteOpened");
				await this.saveSettings();
			})
		);

		this.uninstallCommands.push(
			onCommandTrigger("switcher:open", async () => {
				this.settings.quickSwitcherOpened += 1;
				this.getNewAchievementMaybe("quickSwitcherOpened");
				await this.saveSettings();
			})
		);

		this.addSettingTab(new AchievementsSettingTab(this.app, this));

		this.settings.noteCount = this.app.vault.getMarkdownFiles().length;
		this.settings.internalLinkCount =
			app.fileManager.getAllLinkResolutions().length;
		await this.saveSettings();
	}

	onunload() {
		console.log("unloading Achievements plugin");
		this.uninstallCommands.forEach((uninstallCommand) => {
			uninstallCommand();
		});
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
		store.plugin.set(this);
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
