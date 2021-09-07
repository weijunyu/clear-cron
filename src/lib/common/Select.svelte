<script lang="ts">
  export let value: any;
</script>

<select value={value} on:change>
  <slot></slot>
</select>

<style>
  select {
    padding: 4px 0;
    cursor: pointer;
    font-size: 1rem;
  }
</style>
