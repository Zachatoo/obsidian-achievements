import type { CachedMetadata } from "obsidian";

export function fileHasCallout(cache: CachedMetadata) {
	return cache.sections?.some((section) => section.type === "callout");
}
