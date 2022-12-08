export interface Settings {
	achievedAchievementIDs: string[];
	processedFiles: Set<bigint>;
	notesCreated: number;
	notesDeleted: number;
	internalLinksCreated: number;
	commandPaletteOpened: number;
	quickSwitcherOpened: number;
	calloutsCreated: number;
	headingLevelsCreated: number;
	tagsCreated: number;
}

export const DEFAULT_SETTINGS: Settings = {
	achievedAchievementIDs: [],
	processedFiles: new Set(),
	notesCreated: 0,
	notesDeleted: 0,
	internalLinksCreated: 0,
	commandPaletteOpened: 0,
	quickSwitcherOpened: 0,
	calloutsCreated: 0,
	headingLevelsCreated: 0,
	tagsCreated: 0,
};
