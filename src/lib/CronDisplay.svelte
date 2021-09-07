<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CronItemDisplay from "./CronItemDisplay.svelte";
  import type { CronState, TimeUnitValue } from "./util";
  import { timeUnitOptions } from "./util";

  export let cronState: CronState;
  export let selectedTimeUnit: TimeUnitValue;

  const dispatch = createEventDispatcher();

  function updateTimeUnit(timeUnit: TimeUnitValue) {
    dispatch("timeUnitChange", {
      timeUnit
    });
  }
</script>

<div class="cron-string-display">
  {#each timeUnitOptions as timeUnitOption (timeUnitOption.value)}
    {#if cronState[timeUnitOption.value]}
    <CronItemDisplay
      timeIntervals={cronState[timeUnitOption.value]}
      active={selectedTimeUnit === timeUnitOption.value}
      on:click={() => updateTimeUnit(timeUnitOption.value)}
    />
    {/if}
  {/each}
</div>

<style>
  .cron-string-display {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
</style>