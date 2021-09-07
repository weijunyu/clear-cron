<script lang="ts">
  import Button from "./common/Button.svelte";
  import { CronState, getCronstringFromCronState } from "./util";

  export let cronState: CronState;

  function copyCronString() {
    const cronString = getCronstringFromCronState(cronState);
    navigator.clipboard.writeText(cronString);
  }
</script>

<div class="copy-button-container">
  <Button fillWidth={false} on:click={copyCronString}><i class="fas fa-copy" /> Copy</Button>
</div>

<style>
  .copy-button-container {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
</style>
