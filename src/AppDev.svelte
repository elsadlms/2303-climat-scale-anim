<script>
  import Bars from './BarsDev.svelte';
  import Circles from './CirclesDev.svelte';
  import { lifespanData } from './data';

  let step = 0;

  const incrementStep = () => {
    if (step === lifespanData.length) return;
    step++;
  };

  const decrementStep = () => {
    if (step === 0) return;
    step--;
  };

  const resetStep = () => {
    step = 0;
  };

  $: barsStep = step
  $: circlesStep = Math.min(3, step)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="lm-climat-scale">
  <p class="step-info">Step {step}</p>
  <div class="buttons">
    <p on:click={incrementStep}>Step++</p>
    <p on:click={decrementStep}>Step--</p>
    <p on:click={resetStep}>Step = 0</p>
  </div>

  <Bars step={barsStep} />
  <Circles step={circlesStep} />
</div>

<style global>
  .lm-climat-scale {
    padding: 24px;
    font-family: 'Marr Sans';
    background-color: #0E101B;
    min-height: 100vh;
  }

  .step-info {
    color: #ddd;
    font-weight: 600;
    padding-bottom: 12px;
  }

  .buttons {
    display: flex;
    gap: 1em;
    padding-bottom: 48px;
  }

  .buttons p {
    cursor: pointer;
    padding: 12px 24px;
    border-radius: 6px;
    background-color: #ddd;
  }
</style>
