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
    border-radius: 4px;
    cursor: pointer;
  }
  .cron-item-display:hover {
    background-color: #f3f3f3;
    box-shadow: 2px 2px 4px rgba(134, 134, 134, 0.514);
    transform: translateY(-2px);
    transition: all 0.2s;
  }
  .cron-item-display:active {
    transform: translateY(0);
    box-shadow: 1px 1px 2px rgba(134, 134, 134, 0.514);
    transition: all 0s;
  }
  .cron-item-display:last-child {
    margin-right: 0;
  }
  .active {
    background-color: #f3f3f3;
  }
</style>