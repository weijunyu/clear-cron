<script lang="ts">
import Cron from "./lib/Cron.svelte";
import "./normalize.css";
</script>

<main>
  <Cron />
</main>

<style>
:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
main {
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  padding-top: 1rem;
  max-width: 768px;
  min-height: 100vh;
}
</style>
