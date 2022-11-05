import type AchievementsPlugin from "src/main";
import type { Achievement } from "src/seededAchievements";

export function sortAchievements(
	arr: Achievement[],
	plugin: AchievementsPlugin
) {
	const result = [...arr];
	return result.sort((a, b) => {
		const achievedCriteria =
			(plugin.settings.achievedAchievementIDs.includes(a.id) ? 1 : 0) -
			(plugin.settings.achievedAchievementIDs.includes(b.id) ? 1 : 0);
		if (achievedCriteria !== 0) {
			return achievedCriteria;
		}

		const aProgress = plugin.settings[a.type] / a.requiredOccurenceCount;
		const bProgress = plugin.settings[b.type] / b.requiredOccurenceCount;
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
