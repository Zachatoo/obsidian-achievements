export interface Settings {
	achievedAchievementIDs: string[];
	noteCount: number;
	notesCreated: number;
	notesDeleted: number;
	internalLinkCount: number;
	internalLinksCreated: number;
	commandPaletteOpened: number;
	quickSwitcherOpened: number;
}

export const DEFAULT_SETTINGS: Settings = {
	achievedAchievementIDs: [],
	noteCount: 0,
	notesCreated: 0,
	notesDeleted: 0,
	internalLinkCount: 0,
	internalLinksCreated: 0,
	commandPaletteOpened: 0,
	quickSwitcherOpened: 0,
};
