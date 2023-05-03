import type { Achievement } from "src/seededAchievements";
import type { Settings } from "src/settings";

export function sortAchievements(arr: Achievement[], settings: Settings) {
	const result = [...arr];
	return result.sort((a, b) => {
		const achievedCriteria =
			(settings.achievedAchievementIDs.includes(a.id) ? 1 : 0) -
			(settings.achievedAchievementIDs.includes(b.id) ? 1 : 0);
		if (achievedCriteria !== 0) {
			return achievedCriteria;
		}

		const aProgress = settings[a.type] / a.requiredOccurenceCount;
		const bProgress = settings[b.type] / b.requiredOccurenceCount;
		const progressCriteria = bProgress - aProgress;
		if (progressCriteria !== 0) {
			return progressCriteria;
		}

		const requiredOccurenceCountCriteria =
			a.requiredOccurenceCount - b.requiredOccurenceCount;
		if (requiredOccurenceCountCriteria !== 0) {
			return requiredOccurenceCountCriteria;
		}

		return a.name.localeCompare(b.name);
	});
}
