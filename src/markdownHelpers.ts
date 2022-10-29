import type { CachedMetadata } from "obsidian";

export function fileHasCallout(cache: CachedMetadata) {
	return cache.sections?.some((section) => section.type === "callout");
}

export function getFileHeadingLevelsCount(cache: CachedMetadata) {
	if (!cache.headings) {
		return 0;
	}

	const levels = cache.headings.reduce((obj, { level }) => {
		obj[level] = true;
		return obj;
	}, {} as { [key: string]: boolean });

	return Object.keys(levels).length;
}
