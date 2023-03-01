<script>
  export let element;
  export let visible;
  export let scale;
  export let step;

  const { id, lifespan, lifespanHigh, name, labelHigh, label } = element;

  let wrapperWidth;
  $: maxWidth = Math.min(wrapperWidth-220, 500);

  $: width = visible ? (lifespan / scale) * maxWidth : 0;
  $: widthHigh =
    step > 2 && lifespanHigh
      ? ((lifespanHigh - lifespan) / scale) * maxWidth
      : 0;

  $: wrapperStyle = `opacity: ${visible ? 1 : 0};`;
  $: barStyle = `width: ${width}px;`;
  $: barDottedStyle = `width: ${widthHigh}px;`;
  $: noteStyle = `opacity: ${step === 2 ? 1 : 0};`;
</script>

<div
  bind:clientWidth={wrapperWidth}
  class="lm-climat-scale_bar-wrapper 
  {visible ? 'lm-climat-scale_bar-wrapper--visible' : ''}"
  style={wrapperStyle}
>
  <p class="lm-climat-scale_bar-name">{name}</p>
  <div class="lm-climat-scale_bar">
    <div class="lm-climat-scale_bar-shape" style={barStyle} />
    <div class="lm-climat-scale_bar-shape--dotted" style={barDottedStyle} />
    <p class="lm-climat-scale_bar-label">
      {step > 2 && labelHigh ? labelHigh : label}
    </p>
  </div>
  {#if id === 'co2'}
    <p class="lm-climat-scale_bar-note" style={noteStyle}>
      Le carbone a une durée de vie comprise entre 100 et 1 000 ans.
    </p>
  {/if}
</div>

<style>
  .lm-climat-scale_bar-wrapper {
    margin-bottom: 12px;
    display: grid;
    grid-template-columns: 4em 1fr;
    transition: opacity 400ms;
    position: relative;
    font-family: var(--ff-marr-sans);
  }

  .lm-climat-scale_bar-wrapper--visible {
    transition: opacity 1000ms 1000ms;
  }

  .lm-climat-scale_bar-note {
    transition: opacity 1000ms 1400ms;
    position: absolute;
    top: 2em;
    left: 2em;
  }

  .lm-climat-scale_bar-name {
    font-weight: 600;
    text-align: right;
    padding-right: 0.6em;
  }

  .lm-climat-scale_bar-label {
    padding-left: 1.2em;
    font-weight: 600;
  }

  .lm-climat-scale_bar-name,
  .lm-climat-scale_bar-label {
    position: relative;
    top: 0.1em;
  }

  .lm-climat-scale_bar {
    display: flex;
    align-items: center;
  }

  .lm-climat-scale_bar-shape--dotted,
  .lm-climat-scale_bar-shape {
    border-bottom: 2px solid orangered;
    transition: width 1600ms;
    position: relative;
  }

  .lm-climat-scale_bar-shape::before,
  .lm-climat-scale_bar-shape::after,
  .lm-climat-scale_bar-shape--dotted::after {
    display: block;
    content: '';
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background-color: orangered;
    position: absolute;
    top: -5px;
  }

  .lm-climat-scale_bar-shape::after,
  .lm-climat-scale_bar-shape--dotted::after {
    right: -12px;
  }

  .lm-climat-scale_bar-shape--dotted {
    border-bottom: 2px dashed orangered;
  }
</style>
