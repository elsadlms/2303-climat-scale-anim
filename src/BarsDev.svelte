<script>
  import { lifespanData } from './data';

  import Bar from './Bar.svelte';

  const steps = [0, 1, 2, 2, 3];

  export let step = 0;

  let wrapperWidth = 0;

  $: visibleData = lifespanData.filter((_el, i) => i <= index);

  console.log('allo');

  $: index = steps[step];
  $: scale =
    step === 3
      ? lifespanData[index]?.lifespanHigh
      : Math.max(...visibleData.map((el) => el.lifespan));
</script>

<div bind:clientWidth={wrapperWidth} class="lm-climat-scale_bars">
  {#if lifespanData}
    {#each ['ch4', 'n2o', 'co2', 'cf4'] as id, i}
      <Bar
        element={lifespanData.find((el) => el.id === id)}
        visible={i <= index}
        {wrapperWidth}
        {scale}
        {step}
      />
    {/each}
  {/if}
</div>
