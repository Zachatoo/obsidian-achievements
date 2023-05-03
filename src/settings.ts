import { writable } from "svelte/store";

export interface Settings {
	achievedAchievementIDs: string[];
	notesCreated: number;
	notesDeleted: number;
	internalLinksCreated: number;
	commandPaletteOpened: number;
	quickSwitcherOpened: number;
	calloutsCreated: number;
	headingLevelsCreated: number;
	tagsCreated: number;
}

const DEFAULT_SETTINGS: Settings = {
	achievedAchievementIDs: [],
	notesCreated: 0,
	notesDeleted: 0,
	internalLinksCreated: 0,
	commandPaletteOpened: 0,
	quickSwitcherOpened: 0,
	calloutsCreated: 0,
	headingLevelsCreated: 0,
	tagsCreated: 0,
};

function createStore() {
	const { subscribe, set, update } = writable<Settings>();

	function init(settings: Settings) {
		const newSettings = Object.assign({}, DEFAULT_SETTINGS, settings);
		set(newSettings);
	}

	function reset() {
		update((store) => {
			store = { ...DEFAULT_SETTINGS };
			return store;
		});
	}

	return {
		subscribe,
		set,
		init,
		reset,
	};
}

const store = createStore();

export default store;
