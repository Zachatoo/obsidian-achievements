import type { MetadataCache } from "obsidian";

export function getTagsCount(metadataCache: MetadataCache) {
	const tagsObj = metadataCache.getTags();
	const baseTagsArr = Object.entries(tagsObj).filter(
		([key]) => !key.includes("/")
	);
	return baseTagsArr.reduce((prev, curr) => prev + curr[1], 0);
}
