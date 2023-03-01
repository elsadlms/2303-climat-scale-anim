<script>
  import { lifespanData } from './data';

  import Bar from './Bar.svelte';

  const steps = [0, 1, 2, 2, 3];

  export let context;

  $: index = steps[context.page];
  $: scale =
    context.page === 3
      ? lifespanData[index]?.lifespanHigh
      : lifespanData[index]?.lifespan;
</script>

<div class="lm-climat-scale_bars-container">
  <div class="lm-climat-scale_bars">
    {#if lifespanData}
      {#each ['ch4', 'n2o', 'co2', 'pfc'] as id, i}
        <Bar
          element={lifespanData.find((el) => el.id === id)}
          visible={i <= index}
          step={context.page}
          {scale}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .lm-climat-scale_bars-container {
    height: 100%;
    width: 100%;
  }
</style>
