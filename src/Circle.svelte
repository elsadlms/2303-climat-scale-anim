<script>
  export let element;
  export let visible;
  export let scale;

  const { value, name, label } = element;

  let wrapperWidth;
  $: maxSize = Math.min(wrapperWidth - 140, 250);

  $: size = visible ? Math.max(2, (value / scale) * maxSize) : 0;

  $: wrapperStyle = `opacity: ${visible ? 1 : 0}; --lm-col-width: ${
    maxSize + 24
  }px;`;
  $: circleStyle = `width: ${size}px; height: ${size}px;`;
</script>

<div
  bind:clientWidth={wrapperWidth}
  class="lm-climat-scale_circle-wrapper"
  style={wrapperStyle}
>
  <p class="lm-climat-scale_circle-name">{name}</p>
  <div class="lm-climat-scale_circle-shape" style={circleStyle} />
  <p class="lm-climat-scale_circle-label">{label}</p>
</div>

<style>
  .lm-climat-scale_circle-wrapper {
    margin-bottom: 12px;
    transition: opacity 1000ms;
    display: grid;
    grid-template-columns: 4em var(--lm-col-width) 1fr;
    align-items: center;
    font-family: var(--ff-marr-sans);
  }

  .lm-climat-scale_circle-name {
    font-weight: 600;
    text-align: right;
  }

  .lm-climat-scale_circle-label {
    font-weight: 600;
  }

  .lm-climat-scale_circle-shape {
    border-radius: 100%;
    transition: width 1600ms, height 1600ms;
    background-color: orangered;
    justify-self: center;
  }
</style>
