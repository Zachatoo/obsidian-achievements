import "obsidian";

declare module "obsidian" {
	interface Vault {
		fileMap: { [key: string]: any };
	}
}
