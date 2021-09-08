<script lang="ts">
  export let active: boolean = false;
  export let fillWidth: boolean = true;
  export let fillHeight = true;
  export let disabled = false;
  export let style: string = "";
</script>

<button 
  class="button"
  class:active={active}
  class:fill-width={fillWidth}
  class:fill-height={fillHeight}
  disabled={disabled}
  style={style}
  on:click>
  <slot></slot>
</button>

<style>
  .button {
    border-radius: 2px;
    padding: 0.5rem;
    background-color: #fff;
    color: #3a3a3a;
    outline: none;
    border: none;
  }
  .button:hover {
    cursor: pointer;
    color: white;
    background-color: #1a90e4;
    box-shadow: 2px 2px 4px rgba(134, 134, 134, 0.514);
    transform: translateY(-2px);
    transition: 0.2s ease-in;
  }
  .button:active {
    transform: translateY(0);
    box-shadow: 1px 1px 2px rgba(134, 134, 134, 0.514);
    transition: 0s;
  }
  .button:disabled {
    background-color: rgb(224, 224, 224);
    cursor: not-allowed;
    color: #6b6b6b;
  }
  .button:disabled:hover {
    transform: none;
    box-shadow: none;
  }
  .active {
    color: white;
    background-color: #1a90e4;
  }
  .fill-width {
    width: 100%;
  }
  .fill-height {
    height: 100%;
  }
</style>