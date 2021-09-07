<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import * as util from "./util";
  import Select from "./common/Select.svelte";

  export let selectedTimeInterval: util.TimeIntervalValue;

  const dispatch = createEventDispatcher();

  function updateTimeInterval(event: Event & {
    currentTarget: EventTarget & HTMLSelectElement;
  }) {
    dispatch("timeIntervalChange", {
      timeInterval: event.currentTarget.value as util.TimeIntervalValue
    });
  }
</script>

<Select value={selectedTimeInterval} on:change={updateTimeInterval}>
  {#each util.timeIntervalOptions as timeIntervalOption (timeIntervalOption.value)}
  <option value={timeIntervalOption.value}>{timeIntervalOption.label}</option>
  {/each}
</Select>
