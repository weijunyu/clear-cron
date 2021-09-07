<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import * as util from "./util";
  import Button from "./common/Button.svelte";

  export let selectedTimeUnit: util.TimeUnitValue;
  export let numberOfCronFields: number;

  const dispatch = createEventDispatcher();

  function updateTimeUnit(timeUnit: util.TimeUnitValue) {
    dispatch("timeUnitChange", {
      timeUnit
    });
  }
</script>

<ul>
  {#each util.timeUnitOptions as timeUnitOption, index (timeUnitOption.value)}
    {#if index === 0 && numberOfCronFields === 6}
      <li>
        <Button
          on:click={() => updateTimeUnit(timeUnitOption.value)}
          active={selectedTimeUnit === timeUnitOption.value}
        >
          {util.capitalize(timeUnitOption.label)}
        </Button>
      </li>
    {/if}
    {#if index >= 1}
    <li>
      <Button
        on:click={() => updateTimeUnit(timeUnitOption.value)}
        active={selectedTimeUnit === timeUnitOption.value}
      >
        {util.capitalize(timeUnitOption.label)}
      </Button>
    </li>
    {/if}
  {/each}
</ul>

<style>
  ul {
    display: flex;
    list-style: none;
    padding-inline: 0;
    display: flex;
  }
  li {
    margin: 0.1rem;
    flex: 1 1 auto;
  }
</style>