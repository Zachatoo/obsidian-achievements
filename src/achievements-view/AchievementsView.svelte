<script lang="ts">
	import { SettingItem } from "obsidian-svelte";
	import { sortAchievements } from "src/array-utils/sort";
	import { SEEDED_ACHIEVEMENTS } from "src/seededAchievements";
	import settingsStore from "src/settings";
</script>

{#each sortAchievements(SEEDED_ACHIEVEMENTS, $settingsStore) as achievement}
	<SettingItem name={achievement.name} description={achievement.description}>
		<progress
			class="achievements-plugin__progress"
			value={Math.min(
				$settingsStore[achievement.type],
				achievement.requiredOccurenceCount
			)}
			max={achievement.requiredOccurenceCount}
		/>
	</SettingItem>
{/each}
