<script lang="ts">
  import { Button } from 'obsidian-svelte'

  export let close: () => void;
  export let closeAndReset: () => Promise<void>;
</script>

<h2>Reset Progress</h2>

<p>Resets all achievement progress. THIS CANNOT BE UNDONE.</p>
<p>Are you sure you want to continue?</p>

<div class="achievements-plugin__reset-modal__button-container">
  <Button on:click={close}>Cancel</Button>
  <Button variant="destructive" on:click={closeAndReset}>Reset</Button>
</div>