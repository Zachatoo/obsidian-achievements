export interface Settings {
	achievedAchievementIDs: string[];
	noteCount: number;
	notesCreated: number;
	notesDeleted: number;
	connectionsCreated: number;
}

export const DEFAULT_SETTINGS: Settings = {
	achievedAchievementIDs: [],
	noteCount: 0,
	notesCreated: 0,
	notesDeleted: 0,
	connectionsCreated: 0,
};
