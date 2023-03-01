<script>
  import { warmingData } from './data';

  import Circle from './Circle.svelte';

  export let context;

  $: scale = warmingData[context.page]?.value;
</script>

<div class="lm-climat-scale_circles-container">
    <div class="lm-climat-scale_circles">
      {#if warmingData}
        {#each warmingData as circle, i}
          <Circle
            element={circle}
            visible={i <= context.page}
            wrapperWidth={context.width}
            {scale}
          />
        {/each}
      {/if}
    </div>
</div>

<style>
  .lm-climat-scale_circles-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
