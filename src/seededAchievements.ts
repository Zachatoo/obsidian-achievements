export type AchievementType =
	| "notesCreated"
	| "notesDeleted"
	| "internalLinksCreated"
	| "commandPaletteOpened"
	| "quickSwitcherOpened"
	| "calloutsCreated";

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
	{
		id: "firstInternalLink",
		type: "internalLinksCreated",
		name: "Linking your thinking",
		description:
			"You've created your first internal link. It's all coming together!",
		requiredOccurenceCount: 1,
	},
	{
		id: "tenInternalLinks",
		type: "internalLinksCreated",
		name: "Making connections",
		description:
			"You've created 10 internal links. Your graph is looking great!",
		requiredOccurenceCount: 10,
	},
	{
		id: "oneHundredInternalLinks",
		type: "internalLinksCreated",
		name: "Conspiracy theorist",
		description:
			"You've created 100 internal links. Your graph is starting to look like a conspiracy board...",
		requiredOccurenceCount: 100,
	},
	{
		id: "oneThousandInternalLinks",
		type: "internalLinksCreated",
		name: "Air traffic controller",
		description:
			"You've created 1000 internal links. If you haven't already, you should post your graph on the official Obsidian discord.",
		requiredOccurenceCount: 1000,
	},
	{
		id: "command-palette:open",
		type: "commandPaletteOpened",
		name: "Commander",
		description:
			"You've opened the command palette. Way to take charge of your note taking!",
		requiredOccurenceCount: 1,
	},
	{
		id: "switcher:open",
		type: "quickSwitcherOpened",
		name: "Quickly now",
		description: "You've opened the quick switcher. Wow that was fast!",
		requiredOccurenceCount: 1,
	},
	{
		id: "oneCallout",
		type: "calloutsCreated",
		name: "Callouts",
		description:
			"You've created a callout. Just felt like that needed to be called out.",
		requiredOccurenceCount: 1,
	},
];
