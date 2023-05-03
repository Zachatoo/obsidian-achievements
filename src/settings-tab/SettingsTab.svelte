<script lang="ts">
	import { Button, SettingItem } from "obsidian-svelte";
	import { SEEDED_ACHIEVEMENTS } from "src/seededAchievements";
	import settingsStore from "src/settings";

	export let openResetModal: () => void;
</script>

<h2>Achievements List</h2>

{#each SEEDED_ACHIEVEMENTS as achievement}
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

<h2>Danger Zone</h2>

<SettingItem
	name="Reset Progress"
	description="Resets all achievement progress. THIS CANNOT BE UNDONE."
>
	<Button variant="destructive" on:click={openResetModal}>Reset</Button>
</SettingItem>
