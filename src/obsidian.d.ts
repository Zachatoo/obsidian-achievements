import "obsidian";

declare module "obsidian" {
	interface App {
		commands: Commands;
	}

	interface Commands {
		executeCommand: (command: Command) => boolean;
	}

	interface MetadataCache {
		getTags: () => { [key: string]: number };
		iterateReferences: (
			callback: (sourcePath: string, reference: ReferenceCache) => any
		) => any;
	}
}
