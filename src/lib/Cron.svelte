<script lang="ts">
  import TimeIntervalSelect from "./TimeIntervalSelect.svelte";
  import TimeUnitSelect from "./TimeUnitSelect.svelte";
  import TimeValueSelect from "./TimeValueSelect.svelte";
  import CronDisplay from "./CronDisplay.svelte";
  import Button from "./common/Button.svelte";
  import NumberOfCronFieldsSelector from "./NumberOfCronFieldsSelector.svelte";
  import CopyButton from "./CopyButton.svelte";
  import Title from "./common/Title.svelte";

  import * as util from "./util";

  /*
    https://en.wikipedia.org/wiki/Cron
    option matrix         time unit
                          minute | hour | day of month | month | day of week
    time        at
    interval    from...to
                every

    "*"; // "every": 1 = *
    ",";
    "-"; // "from": 0, "to": 15 = 0-15
    "/"; // "every": 2 = *\/2
   */

  /** This is the variable holding all our state! */
  let state = util.deepClone(util.initialState);

  let selectedTimeUnit = util.timeUnitOptions[0].value;
  function onTimeUnitChange(event: CustomEvent<{ timeUnit: util.TimeUnitValue }>) {
    selectedTimeUnit = event.detail.timeUnit;
  }

  $: selectedTimeUnitLabel = util
    .timeUnitOptions
    .find((timeUnitOption) => timeUnitOption.value === selectedTimeUnit)
    .label;
  $: selectedTimeUnitState = state[selectedTimeUnit];
  $: numberOfCronFields = Object.keys(state).filter(timeUnit => state[timeUnit] !== null).length;

  function onTimeIntervalChange(timeUnitIndex: number) {
    return function(event: CustomEvent<{ timeInterval: util.TimeIntervalValue }>) {
      state[selectedTimeUnit] = state[selectedTimeUnit].map((timeUnitState, index) => {
        if (index === timeUnitIndex) {
          let selectedTimeUnitData = { ...timeUnitState };
          if (selectedTimeUnitData.interval === "from" && event.detail.timeInterval !== "from") {
            selectedTimeUnitData.value = selectedTimeUnitData.value[0];
          }
          // Changing interval from something to "from"
          if (selectedTimeUnitData.interval !== "from" && event.detail.timeInterval === "from") {
            selectedTimeUnitData.value = [
              selectedTimeUnitData.value as number,
              selectedTimeUnitData.value as number
            ]
          }
          selectedTimeUnitData.interval = event.detail.timeInterval;
          return selectedTimeUnitData;
        }
        return timeUnitState;
      })
    }
  }

  function onTimeValueChange(options: { intervalIndex: number }) {
    return (event: CustomEvent<{ value: number }>) => {
      state[selectedTimeUnit] = state[selectedTimeUnit].map((timeUnitState, index) => {
        if (options.intervalIndex === index) {
          let selectedTimeUnitData = { ...timeUnitState };
          const { value } = event.detail;
          selectedTimeUnitData.value = value;
          return selectedTimeUnitData;
        }
        return timeUnitState;
      });
    }
  }
  function onTimeRangeValueChange(options: { intervalIndex: number; rangeType: "from" | "to" }) {
    return (event: CustomEvent<{ value: number }>) => {
      state[selectedTimeUnit] = state[selectedTimeUnit].map((timeUnitState, index) => {
        if (options.intervalIndex === index) {
          let selectedTimeUnitData = { ...timeUnitState };
          const { value } = event.detail;
          if (options.rangeType === "from") {
            selectedTimeUnitData.value[0] = value;
          }
          if (options.rangeType === "to") {
            selectedTimeUnitData.value[1] = value;
          }
          return selectedTimeUnitData;
        }
        return timeUnitState;
      })
    }
  }

  function addTimeInterval() {
    state[selectedTimeUnit] = [
      ...state[selectedTimeUnit],
      {
        interval: "every",
        value: 1,
      }
    ]
  }

  function removeTimeInterval(intervalIndex: number) {
    return function() {
      state[selectedTimeUnit] = state[selectedTimeUnit].filter((_, index) => index !== intervalIndex);
    }
  }

  function updateNumberOfCronFields(event: CustomEvent<{ value: number }>) {
    const { value } = event.detail;
    // If going from 6 to 5, 
    if (numberOfCronFields === 6 && value === 5) {
      state = {
        ...state,
        second: null
      }
      if (selectedTimeUnit === "second") {
        selectedTimeUnit = "minute";
      }
    } else if (numberOfCronFields === 5 && value === 6) {
      // Going from 5 to 6
      state = {
        ...state,
        second: [
          {
            interval: "at",
            value: 0,
          },
        ]
      }
    }
  }
</script>

<Title>Clear Cron</Title>

<NumberOfCronFieldsSelector on:update={updateNumberOfCronFields} numberOfCronFields={numberOfCronFields} />

<CronDisplay
  cronState={state}
  selectedTimeUnit={selectedTimeUnit}
  on:timeUnitChange={onTimeUnitChange} />

<CopyButton cronState={state} />

<TimeUnitSelect
  numberOfCronFields={numberOfCronFields}
  selectedTimeUnit={selectedTimeUnit} 
  on:timeUnitChange={onTimeUnitChange} 
/>

{#each selectedTimeUnitState as selectedTimeInterval, index}
  {#if selectedTimeUnitState}
  <section class="time-intervals-values">
    <span>
      <TimeIntervalSelect
        selectedTimeInterval={selectedTimeInterval.interval} 
        on:timeIntervalChange={onTimeIntervalChange(index)}
      />
      {#if selectedTimeInterval.interval === "from"}
        <TimeValueSelect
          timeValueSelected={selectedTimeInterval.value[0]}
          timeValueOptions={util.getTimeValueOptions(selectedTimeUnit, selectedTimeInterval.interval)}
          on:timeValueChange={onTimeRangeValueChange({ intervalIndex: index, rangeType: "from" })}
        />
        <span>to</span>
        <TimeValueSelect
          timeValueSelected={selectedTimeInterval.value[1]}
          timeValueOptions={util.getTimeValueOptions(selectedTimeUnit, selectedTimeInterval.interval)}
          on:timeValueChange={onTimeRangeValueChange({ intervalIndex: index, rangeType: "to" })}
        />
      {:else if !Array.isArray(selectedTimeInterval.value)}
        <TimeValueSelect
          timeValueSelected={selectedTimeInterval.value}
          timeValueOptions={util.getTimeValueOptions(selectedTimeUnit, selectedTimeInterval.interval)}
          on:timeValueChange={onTimeValueChange({ intervalIndex: index })} 
        />
      {/if}
    </span>

    <Button
      on:click={removeTimeInterval(index)} 
      disabled={selectedTimeUnitState.length === 1}
      fillWidth={false}
    >
      Remove
    </Button>
  </section>
  {/if}
{/each}
<Button on:click={addTimeInterval} active>
  Add new {selectedTimeUnitLabel} rule
</Button>

<style>
  .time-intervals-values {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    background-color: #f7f7f7;
    padding: 1rem 0.5rem;
    border-radius: 2px;
  }
</style>
