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
import {
	AchievementsView,
	VIEW_TYPE_ACHIEVEMENTS,
} from "./achievements-view/AchievementsView";

export default class AchievementsPlugin extends Plugin {
	settings: Settings;
	internalCounts: InternalCounts;

	async onload() {
		console.log("loading Achievements plugin");

		await this.loadSettings();

		this.setupInternalCounts();

		this.registerView(
			VIEW_TYPE_ACHIEVEMENTS,
			(leaf) => new AchievementsView(leaf, this)
		);

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

		this.register(
			onCommandTrigger("command-palette:open", async () => {
				this.settings.commandPaletteOpened += 1;
				this.getNewAchievementMaybe("commandPaletteOpened");
				await this.saveSettings();
			})
		);

		this.register(
			onCommandTrigger("command-palette:open", async () => {
				this.settings.commandPaletteOpened += 1;
				this.getNewAchievementMaybe("commandPaletteOpened");
				await this.saveSettings();
			})
		);

		this.register(
			onCommandTrigger("switcher:open", async () => {
				this.settings.quickSwitcherOpened += 1;
				this.getNewAchievementMaybe("quickSwitcherOpened");
				await this.saveSettings();
			})
		);

		this.addCommand({
			id: "show-achievements-view",
			name: "Show Achievements Panel",
			callback: () => {
				this.activateView();
			},
		});

		this.addSettingTab(new AchievementsSettingTab(this.app, this));
	}

	onunload() {
		console.log("unloading Achievements plugin");

		this.app.workspace.detachLeavesOfType(VIEW_TYPE_ACHIEVEMENTS);
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

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_ACHIEVEMENTS);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_ACHIEVEMENTS,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_ACHIEVEMENTS)[0]
		);
	}

	getMarkdownFilesCount() {
		return this.app.vault.getMarkdownFiles().length;
	}

	getInternalLinksCount() {
		let count = 0;
		this.app.metadataCache.iterateReferences(() => {
			count++;
		});
		return count;
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
				new Notice(`${achievement.name}\n${achievement.popupMessage}`);
			});
		}
	}
}
