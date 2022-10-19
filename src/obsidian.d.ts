import "obsidian";

declare module "obsidian" {
	interface FileManager {
		getAllLinkResolutions: () => {
			reference: LinkCache;
			resolvedFile: TFile;
			resolvedPaths: string[];
			sourceFile: TFile;
		}[];
	}

	interface App {
		commands: Commands;
	}

	interface Commands {
		executeCommand: (command: Command) => boolean;
	}
}
