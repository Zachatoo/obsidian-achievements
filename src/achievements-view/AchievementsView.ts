import { ItemView, WorkspaceLeaf } from "obsidian";
import type AchievementsPlugin from "src/main";
import AchievementsViewComponent from "./AchievementsView.svelte";
import store from "src/store";

export const VIEW_TYPE_ACHIEVEMENTS = "achievements-view";

export class AchievementsView extends ItemView {
	component: AchievementsViewComponent;
	plugin: AchievementsPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: AchievementsPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return VIEW_TYPE_ACHIEVEMENTS;
	}

	getDisplayText() {
		return "Achievements";
	}

	getIcon() {
		return "trophy";
	}

	async onOpen() {
		store.plugin.set(this.plugin);

		this.component = new AchievementsViewComponent({
			target: this.contentEl,
		});
	}

	async onClose() {
		this.component.$destroy();
	}
}
