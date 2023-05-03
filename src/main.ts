import { Notice, Plugin, TAbstractFile, type CachedMetadata } from "obsidian";
import { get } from "svelte/store";
import { AchievementsSettingTab } from "./settings-tab/SettingsTab";
import {
	SEEDED_ACHIEVEMENTS,
	type AchievementType,
} from "./seededAchievements";
import { onCommandTrigger } from "./commands";
import settingsStore, { type Settings } from "./settings";
import { fileHasCallout, getFileHeadingLevelsCount } from "./markdownHelpers";
import type { InternalCounts } from "./InternalCounts";
import {
	AchievementsView,
	VIEW_TYPE_ACHIEVEMENTS,
} from "./achievements-view/AchievementsView";

export default class AchievementsPlugin extends Plugin {
	internalCounts: InternalCounts;

	async onload() {
		console.log("loading Achievements plugin");

		settingsStore.init(await this.loadData());

		this.register(
			settingsStore.subscribe(async (settings) => {
				await this.saveData(settings);
			})
		);

		this.setupInternalCounts();

		this.registerView(
			VIEW_TYPE_ACHIEVEMENTS,
			(leaf) => new AchievementsView(leaf)
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
				const settings = this.getSettings();
				settings.commandPaletteOpened += 1;
				this.setSettings(settings);
				this.getNewAchievementMaybe("commandPaletteOpened");
			})
		);

		this.register(
			onCommandTrigger("switcher:open", async () => {
				const settings = this.getSettings();
				settings.quickSwitcherOpened += 1;
				this.setSettings(settings);
				this.getNewAchievementMaybe("quickSwitcherOpened");
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

	getSettings() {
		return get(settingsStore);
	}

	setSettings(settings: Settings) {
		settingsStore.set(settings);
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
		const settings = this.getSettings();

		if (currNoteCount > this.internalCounts.noteCount) {
			settings.notesCreated +=
				currNoteCount - this.internalCounts.noteCount;
			this.internalCounts.noteCount = currNoteCount;
			this.getNewAchievementMaybe("notesCreated");
		}
		if (currNoteCount < this.internalCounts.noteCount) {
			settings.notesDeleted +=
				this.internalCounts.noteCount - currNoteCount;
			this.internalCounts.noteCount = currNoteCount;
			this.getNewAchievementMaybe("notesDeleted");
		}
		if (currInternalLinkCount > this.internalCounts.internalLinkCount) {
			settings.internalLinksCreated +=
				currInternalLinkCount - this.internalCounts.internalLinkCount;
			this.internalCounts.internalLinkCount = currInternalLinkCount;
			this.getNewAchievementMaybe("internalLinksCreated");
		}

		if (currTagsCount > this.internalCounts.tagCount) {
			settings.tagsCreated +=
				currTagsCount - this.internalCounts.tagCount;
			this.internalCounts.tagCount = currTagsCount;
			this.getNewAchievementMaybe("tagsCreated");
		}

		if (cache) {
			if (settings.calloutsCreated === 0 && fileHasCallout(cache)) {
				settings.calloutsCreated = 1;
				this.getNewAchievementMaybe("calloutsCreated");
			}

			const headingLevelsCount = getFileHeadingLevelsCount(cache);
			if (headingLevelsCount > settings.headingLevelsCreated) {
				settings.headingLevelsCreated = headingLevelsCount;
				this.getNewAchievementMaybe("headingLevelsCreated");
			}
		}

		this.setSettings(settings);
	}

	getNewAchievementMaybe(type: AchievementType) {
		const settings = this.getSettings();
		const newAchievements = SEEDED_ACHIEVEMENTS.filter(
			(achievement) =>
				achievement.type === type &&
				settings[type] >= achievement.requiredOccurenceCount &&
				!settings.achievedAchievementIDs.includes(achievement.id)
		);
		if (newAchievements.length > 0) {
			newAchievements.forEach((achievement) => {
				settings.achievedAchievementIDs.push(achievement.id);
				new Notice(`${achievement.name}\n${achievement.popupMessage}`);
			});
			this.setSettings(settings);
		}
	}
}
