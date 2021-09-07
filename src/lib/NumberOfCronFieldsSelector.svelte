<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let numberOfCronFields: number;

  const dispatch = createEventDispatcher();

  function updateNumberOfCronFields(numberOfFields: number) {
    dispatch("update", {
      value: numberOfFields
    });
  }
</script>

<div class="no-of-cron-fields">
  <label for="cron-fields-select" class="cron-fields-label">Number of cron fields</label>
  <select
    id="cron-fields-select"
    bind:value={numberOfCronFields}
    on:change={(e) => updateNumberOfCronFields(parseInt(e.currentTarget.value))}>
    <option value={5}>5</option>
    <option value={6}>6</option>
  </select>
</div>

<style>
  .no-of-cron-fields {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  .cron-fields-label {
    margin-right: 0.5rem;
  }
  #cron-fields-select {
    margin-right: 0.5rem;
  }
</style>
