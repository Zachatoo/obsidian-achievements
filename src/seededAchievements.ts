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
	popupMessage: string; // message that shows when achievement is achieved
	requiredOccurenceCount: number;
}

export const SEEDED_ACHIEVEMENTS: Achievement[] = [
	{
		id: "notes-created:1",
		type: "notesCreated",
		name: "Your first note",
		description: "Create a note.",
		popupMessage:
			"You've created your first note. You're off to a great start!",
		requiredOccurenceCount: 1,
	},
	{
		id: "notes-created:10",
		type: "notesCreated",
		name: "Note taker",
		description: "Create ten notes.",
		popupMessage: "You've created ten notes. Great job!",
		requiredOccurenceCount: 10,
	},
	{
		id: "notes-created:100",
		type: "notesCreated",
		name: "Wordsmith",
		description: "Create one hundred notes.",
		popupMessage:
			"You've created one hundred notes! You're serious, aren't you?",
		requiredOccurenceCount: 100,
	},
	{
		id: "notes-created:1000",
		type: "notesCreated",
		name: "Storyteller",
		description: "Create one thousand notes.",
		popupMessage: "You've created one thousand notes! That's impressive!",
		requiredOccurenceCount: 1000,
	},
	{
		id: "notes-deleted:10",
		type: "notesDeleted",
		name: "Taking out the trash",
		description: "Delete ten notes.",
		popupMessage: "You've deleted 10 notes. Way to keep your vault tidy!",
		requiredOccurenceCount: 10,
	},
	{
		id: "internal-links-created:1",
		type: "internalLinksCreated",
		name: "Linking your thinking",
		description:
			"Create an internal link. You can type [[ to begin creating a internal link.",
		popupMessage:
			"You've created your first internal link. It's all coming together!",
		requiredOccurenceCount: 1,
	},
	{
		id: "internal-links-created:10",
		type: "internalLinksCreated",
		name: "Making connections",
		description: "Create ten internal links.",
		popupMessage:
			"You've created 10 internal links. Your graph is looking great!",
		requiredOccurenceCount: 10,
	},
	{
		id: "internal-links-created:100",
		type: "internalLinksCreated",
		name: "Conspiracy theorist",
		description: "Create one hundred internal links",
		popupMessage:
			"You've created 100 internal links. Your graph is starting to look like a conspiracy board...",
		requiredOccurenceCount: 100,
	},
	{
		id: "internal-links-created:1000",
		type: "internalLinksCreated",
		name: "Air traffic controller",
		description: "Create one thousand internal links",
		popupMessage:
			"You've created 1000 internal links. If you haven't already, you should post your graph on the official Obsidian discord.",
		requiredOccurenceCount: 1000,
	},
	{
		id: "command-palette:open",
		type: "commandPaletteOpened",
		name: "Commander",
		description:
			"Open the command palette. You can find the hotkey to open the command palette in Settings - Hotkeys.",
		popupMessage:
			"You've opened the command palette. Way to take charge of your note taking!",
		requiredOccurenceCount: 1,
	},
	{
		id: "switcher:open",
		type: "quickSwitcherOpened",
		name: "Quickly now",
		description:
			"Open the quick switcher.  You can find the hotkey to open the quick switcher in Settings - Hotkeys.",
		popupMessage: "You've opened the quick switcher. Wow that was fast!",
		requiredOccurenceCount: 1,
	},
	{
		id: "callouts:1",
		type: "calloutsCreated",
		name: "Callouts",
		description:
			"Create a callout. You can find the hotkey to create a callout in Settings - Hotkeys.",
		popupMessage:
			"You've created a callout. Just felt like that needed to be called out.",
		requiredOccurenceCount: 1,
	},
	{
		id: "heading-levels:1",
		type: "headingLevelsCreated",
		name: "Headings",
		description:
			"Create a heading. You can create a heading by adding a new line to a note and typing # Heading.",
		popupMessage:
			"You've created a heading. Your notes are looking more organized already!",
		requiredOccurenceCount: 1,
	},
	{
		id: "heading-levels:3",
		type: "headingLevelsCreated",
		name: "Nested headings",
		description:
			"Create at least three levels of headings in a single note.",
		popupMessage:
			"You've created at least 3 levels of nested headings. Your notes look so organized!",
		requiredOccurenceCount: 3,
	},
	{
		id: "tags-created:1",
		type: "tagsCreated",
		name: "Your first tag",
		description: "Create a tag. You can create a tag by typing #tag.",
		popupMessage: "You've created your first tag!",
		requiredOccurenceCount: 1,
	},
	{
		id: "tags-created:5",
		type: "tagsCreated",
		name: "Tagging apprentice",
		description: "Create five unique tags.",
		popupMessage: "You've created five unique tags!",
		requiredOccurenceCount: 5,
	},
	{
		id: "tags-created:10",
		type: "tagsCreated",
		name: "Tagging expert",
		description: "Create ten unique tags.",
		popupMessage: "You've created ten unique tags!",
		requiredOccurenceCount: 10,
	},
];
