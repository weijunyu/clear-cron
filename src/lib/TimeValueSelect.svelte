<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { TimeValueOptions } from "./util";
  import Select from "./common/Select.svelte";

  export let timeValueOptions: TimeValueOptions[];
  export let timeValueSelected: number;

  const dispatch = createEventDispatcher();
  function onTimeValueChanged(e: Event & {
    currentTarget: EventTarget & HTMLSelectElement;
  }) {
    dispatch("timeValueChange", {
      value: Number.parseInt(e.currentTarget.value)
    })
  }
</script>

<Select value={timeValueSelected} on:change={onTimeValueChanged}>
  {#each timeValueOptions as timeValueOption (timeValueOption.label)}
  <option value={timeValueOption.value}>{timeValueOption.label}</option>
  {/each}
</Select>
