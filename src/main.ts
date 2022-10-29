import { Notice, Plugin, TAbstractFile, type CachedMetadata } from "obsidian";
import { DEFAULT_SETTINGS, type Settings } from "./settings";
import { AchievementsSettingTab } from "./settings-tab/SettingsTab";
import {
	SEEDED_ACHIEVEMENTS,
	type AchievementType,
} from "./seededAchievements";
import { onCommandTrigger } from "./commands";
import store from "./store";
import { fileHasCallout, getFileHeadingLevelsCount } from "./markdownHelpers";
import type { InternalCounts } from "./InternalCounts";

export default class AchievementsPlugin extends Plugin {
	settings: Settings;
	internalCounts: InternalCounts;
	uninstallCommands: Function[] = [];

	async onload() {
		console.log("loading Achievements plugin");

		await this.loadSettings();

		this.setupInternalCounts();

		this.registerEvent(
			this.app.metadataCache.on("changed", (file, data, cache) => {
				this.handleFileCreateUpdateDelete(file, cache);
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
		this.settings = { ...DEFAULT_SETTINGS };
		await this.saveSettings();
	}

	setupInternalCounts() {
		this.internalCounts = {
			noteCount: this.getMarkdownFilesCount(),
			internalLinkCount: this.getInternalLinksCount(),
			tagCount: this.getTagsCount(),
		};
	}

	getMarkdownFilesCount() {
		return this.app.vault.getMarkdownFiles().length;
	}

	getInternalLinksCount() {
		return this.app.fileManager.getAllLinkResolutions().length;
	}

	getTagsCount() {
		const tagsObj = this.app.metadataCache.getTags();
		const baseTagsArr = Object.entries(tagsObj).filter(
			([key]) => !key.includes("/")
		);
		return baseTagsArr.reduce((prev, curr) => prev + curr[1], 0);
	}

	async handleFileCreateUpdateDelete(
		file: TAbstractFile,
		cache?: CachedMetadata
	) {
		const currNoteCount = this.getMarkdownFilesCount();
		const currInternalLinkCount = this.getInternalLinksCount();
		const currTagsCount = this.getTagsCount();

		if (currNoteCount > this.internalCounts.noteCount) {
			this.settings.notesCreated +=
				currNoteCount - this.internalCounts.noteCount;
			this.internalCounts.noteCount = currNoteCount;
			this.getNewAchievementMaybe("notesCreated");
		}
		if (currNoteCount < this.internalCounts.noteCount) {
			this.settings.notesDeleted +=
				this.internalCounts.noteCount - currNoteCount;
			this.internalCounts.noteCount = currNoteCount;
			this.getNewAchievementMaybe("notesDeleted");
		}
		if (currInternalLinkCount > this.internalCounts.internalLinkCount) {
			this.settings.internalLinksCreated +=
				currInternalLinkCount - this.internalCounts.internalLinkCount;
			this.internalCounts.internalLinkCount = currInternalLinkCount;
			this.getNewAchievementMaybe("internalLinksCreated");
		}

		if (currTagsCount > this.internalCounts.tagCount) {
			this.settings.tagsCreated +=
				currTagsCount - this.internalCounts.tagCount;
			this.internalCounts.tagCount = currTagsCount;
			this.getNewAchievementMaybe("tagsCreated");
		}

		if (cache) {
			if (this.settings.calloutsCreated === 0 && fileHasCallout(cache)) {
				this.settings.calloutsCreated = 1;
				this.getNewAchievementMaybe("calloutsCreated");
			}

			const headingLevelsCount = getFileHeadingLevelsCount(cache);
			if (headingLevelsCount > this.settings.headingLevelsCreated) {
				this.settings.headingLevelsCreated = headingLevelsCount;
				this.getNewAchievementMaybe("headingLevelsCreated");
			}
		}

		await this.saveSettings();
	}

	getNewAchievementMaybe(type: AchievementType) {
		const newAchievements = SEEDED_ACHIEVEMENTS.filter(
			(achievement) =>
				achievement.type === type &&
				this.settings[type] >= achievement.requiredOccurenceCount &&
				!this.settings.achievedAchievementIDs.includes(achievement.id)
		);
		if (newAchievements.length > 0) {
			newAchievements.forEach((achievement) => {
				this.settings.achievedAchievementIDs.push(achievement.id);
				new Notice(`${achievement.name}\n${achievement.description}`);
			});
		}
	}
}
