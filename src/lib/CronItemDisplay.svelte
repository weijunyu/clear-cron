<script lang="ts">
  import type { TimeIntervalValue } from "./util";
  export let timeIntervals: Array<{ interval: TimeIntervalValue; value: number | number[] }>;
  export let active: boolean;
</script>

<span class="cron-item-display" class:active={active} on:click>
  {#each timeIntervals as timeInterval, index}
    {#if timeInterval.interval === "at"}
      {timeInterval.value}
    {:else if timeInterval.interval === "every"}
      {#if timeInterval.value === 1}
        *
      {:else}
        */{timeInterval.value}
      {/if}
    {:else if timeInterval.interval === "from" && Array.isArray(timeInterval.value)}
      {timeInterval.value[0]}-{timeInterval.value[1]}
    {/if}
    {#if index !== timeIntervals.length - 1},{/if}
  {/each}
</span>

<style>
  .cron-item-display {
    margin-right: 1rem;
    padding: 0.5rem;
    font-size: 2.5rem;
  }
  .cron-item-display:last-child {
    margin-right: 0;
  }
  .active {
    text-decoration: underline;
  }
</style>