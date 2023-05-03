import { ItemView, WorkspaceLeaf } from "obsidian";
import AchievementsViewComponent from "./AchievementsView.svelte";

export const VIEW_TYPE_ACHIEVEMENTS = "achievements-view";

export class AchievementsView extends ItemView {
	component: AchievementsViewComponent;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
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
		this.component = new AchievementsViewComponent({
			target: this.contentEl,
		});
	}

	async onClose() {
		this.component.$destroy();
	}
}
