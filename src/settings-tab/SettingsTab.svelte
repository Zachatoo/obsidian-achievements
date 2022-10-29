<script lang="ts">
  import { Button, SettingItem } from 'obsidian-svelte';
	import type AchievementsPlugin from 'src/main';
  import { SEEDED_ACHIEVEMENTS } from "src/seededAchievements";
	import store from 'src/store';

  export let openResetModal: () => void;
  
  let plugin: AchievementsPlugin;
  store.plugin.subscribe((p) => (plugin = p));
</script>

<h2>Achievements List</h2>

{#each SEEDED_ACHIEVEMENTS as achievement}
  <SettingItem name={achievement.name} description={achievement.description}>
    <progress
      class="achievements-plugin__progress"
      value={Math.min(plugin.settings[achievement.type], achievement.requiredOccurenceCount)}
      max={achievement.requiredOccurenceCount}
    />
  </SettingItem>
{/each}

<h2>Danger Zone</h2>

<SettingItem name="Reset Progress" description="Resets all achievement progress. THIS CANNOT BE UNDONE.">
  <Button variant="destructive" on:click={openResetModal}>Reset</Button>
</SettingItem>
