export type AchievementType =
	| "notesCreated"
	| "notesDeleted"
	| "internalLinksCreated"
	| "commandPaletteOpened"
	| "quickSwitcherOpened"
	| "calloutsCreated"
	| "headingLevelsCreated"
	| "tagsCreated";

export interface Achievement {
	id: string;
	type: AchievementType;
	name: string;
	description: string;
	requiredOccurenceCount: number;
}

export const SEEDED_ACHIEVEMENTS: Achievement[] = [
	{
		id: "notes-created:1",
		type: "notesCreated",
		name: "Baby's first note",
		description:
			"You've created your first note. You're off to a great start!",
		requiredOccurenceCount: 1,
	},
	{
		id: "notes-created:10",
		type: "notesCreated",
		name: "Note taker",
		description: "You've created ten notes. You're serious, aren't you?",
		requiredOccurenceCount: 10,
	},
	{
		id: "notes-created:100",
		type: "notesCreated",
		name: "100 club",
		description: "You've created 100 notes! Welcome to the club!",
		requiredOccurenceCount: 100,
	},
	{
		id: "note-created:5280",
		type: "notesCreated",
		name: "Mile high club",
		description: "You've created 5280 notes. You're flying!",
		requiredOccurenceCount: 5280,
	},
	{
		id: "notes-deleted:10",
		type: "notesDeleted",
		name: "Taking out the trash",
		description: "You've deleted 10 notes. Way to keep your vault tidy!",
		requiredOccurenceCount: 10,
	},
	{
		id: "internal-links-created:1",
		type: "internalLinksCreated",
		name: "Linking your thinking",
		description:
			"You've created your first internal link. It's all coming together!",
		requiredOccurenceCount: 1,
	},
	{
		id: "internal-links-created:10",
		type: "internalLinksCreated",
		name: "Making connections",
		description:
			"You've created 10 internal links. Your graph is looking great!",
		requiredOccurenceCount: 10,
	},
	{
		id: "internal-links-created:100",
		type: "internalLinksCreated",
		name: "Conspiracy theorist",
		description:
			"You've created 100 internal links. Your graph is starting to look like a conspiracy board...",
		requiredOccurenceCount: 100,
	},
	{
		id: "internal-links-created:1000",
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
		id: "callouts:1",
		type: "calloutsCreated",
		name: "Callouts",
		description:
			"You've created a callout. Just felt like that needed to be called out.",
		requiredOccurenceCount: 1,
	},
	{
		id: "heading-levels:1",
		type: "headingLevelsCreated",
		name: "Headings",
		description: "You've created a heading.",
		requiredOccurenceCount: 1,
	},
	{
		id: "heading-levels:3",
		type: "headingLevelsCreated",
		name: "Nested headings",
		description: "You've created at least 3 levels of nested headings.",
		requiredOccurenceCount: 3,
	},
	{
		id: "tags:1",
		type: "tagsCreated",
		name: "Tags",
		description: "You've created a tag.",
		requiredOccurenceCount: 1,
	},
	{
		id: "tags:5",
		type: "tagsCreated",
		name: "Tags",
		description: "You've created five tags.",
		requiredOccurenceCount: 5,
	},
	{
		id: "tags:20",
		type: "tagsCreated",
		name: "Tags",
		description: "You've created twenty tags.",
		requiredOccurenceCount: 20,
	},
];
