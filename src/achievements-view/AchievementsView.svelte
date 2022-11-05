<script lang="ts">
	import { SettingItem } from "obsidian-svelte";
	import { sortAchievements } from "src/array-utils/sort";
	import type AchievementsPlugin from "src/main";
	import {
		SEEDED_ACHIEVEMENTS,
		type Achievement,
	} from "src/seededAchievements";
	import store from "src/store";

	let plugin: AchievementsPlugin;
	let achievements: Achievement[];

	store.plugin.subscribe((p) => {
		plugin = p;
		achievements = sortAchievements(SEEDED_ACHIEVEMENTS, plugin);
	});
</script>

{#each achievements as achievement}
	<SettingItem name={achievement.name} description={achievement.description}>
		<progress
			class="achievements-plugin__progress"
			value={Math.min(
				plugin.settings[achievement.type],
				achievement.requiredOccurenceCount
			)}
			max={achievement.requiredOccurenceCount}
		/>
	</SettingItem>
{/each}
