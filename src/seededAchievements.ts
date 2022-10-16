export type AchievementType =
	| "notesCreated"
	| "notesDeleted"
	| "connectionsCreated";

export interface Achievement {
	id: string;
	type: AchievementType;
	name: string;
	description: string;
	requiredOccurenceCount: number;
}

export const SEEDED_ACHIEVEMENTS: Achievement[] = [
	{
		id: "firstNote",
		type: "notesCreated",
		name: "Baby's first note",
		description:
			"You've created your first note. You're off to a great start!",
		requiredOccurenceCount: 1,
	},
	{
		id: "tenNotes",
		type: "notesCreated",
		name: "Note taker",
		description: "You've created ten notes. You're serious, aren't you?",
		requiredOccurenceCount: 10,
	},
	{
		id: "oneHundredNotes",
		type: "notesCreated",
		name: "100 club",
		description: "You've created 100 notes! Welcome to the club!",
		requiredOccurenceCount: 100,
	},
	{
		id: "mileHighClub",
		type: "notesCreated",
		name: "Mile high club",
		description: "You've created 5280 notes. You're flying!",
		requiredOccurenceCount: 5280,
	},
	{
		id: "tenNotesDeleted",
		type: "notesDeleted",
		name: "Taking out the trash",
		description: "You've deleted 10 notes. Way to keep your vault tidy!",
		requiredOccurenceCount: 10,
	},
];
