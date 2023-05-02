<script>
  import { lifespanData } from './data';

  import Bar from './Bar.svelte';

  const steps = [0, 1, 2, 2, 3];

  export let context;
  
  $: visibleData = lifespanData.filter((_el, i) => i <= index)
  $: index = steps[context.page];
  $: scale =
    context.page === 3
      ? lifespanData[index]?.lifespanHigh
      : Math.max(...visibleData.map((el) => el.lifespan));
</script>

<div class="lm-climat-scale_bars-container">
  <div class="lm-climat-scale_bars">
    {#if lifespanData}
      {#each ['ch4', 'n2o', 'co2', 'cf4'] as id, i}
        <Bar
          element={lifespanData.find((el) => el.id === id)}
          visible={i <= index}
          step={context.page}
          wrapperWidth={context.width}
          {scale}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .lm-climat-scale_bars-container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
