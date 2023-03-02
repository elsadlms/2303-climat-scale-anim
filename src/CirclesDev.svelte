<script>
  import { warmingData } from './data';

  import Circle from './Circle.svelte';

  export let step = 0;

  let wrapperWidth = 0;

  $: scale = warmingData[step]?.value;
</script>

<div bind:clientWidth={wrapperWidth} class="lm-climat-scale_circles">
  {#if warmingData}
    {#each warmingData as circle, i}
      <Circle element={circle} visible={i <= step} {wrapperWidth} {scale} />
    {/each}
  {/if}
</div>

<style global>
</style>
