<script>
  export let element;
  export let visible;
  export let scale;
  export let step;
  export let wrapperWidth;

  const { id, note, lifespan, lifespanHigh, name, labelHigh, label } = element;

  // 325 : penser à changer cette valeur si on change la taille des colonnes !!
  $: maxWidth =
    wrapperWidth < 800 ? wrapperWidth - 140 : Math.min(wrapperWidth - 325, 440);

  $: width = visible ? (lifespan / scale) * maxWidth : 0;
  $: widthHigh =
    step > 2 && lifespanHigh
      ? ((lifespanHigh - lifespan) / scale) * maxWidth
      : 0;

  $: console.log(scale);

  $: imageUrl = `https://assets-decodeurs.lemonde.fr/redacweb/2302-rechauffement-scale-anim/${id}.svg`;

  $: wrapperClass = `
    lm-climat-scale_bar-wrapper
    lm-climat-scale_bar-wrapper--${id}
    ${visible ? 'lm-climat-scale_bar-wrapper--visible' : ''} 
  `;

  $: wrapperStyle = `
    --lm-col-width: ${maxWidth + 200}px;
    opacity: ${visible ? 1 : 0};
  `;
  $: barStyle = `width: ${width}px;`;
  $: barDottedStyle = `width: ${widthHigh}px;`;
  $: noteStyle = `opacity: ${step === 2 || step === 3 ? 1 : 0};`;
</script>

<div class={wrapperClass} style={wrapperStyle}>
  {#if wrapperWidth > 0}
    <div class="lm-climat-scale_bar-image">
      <img src={imageUrl} alt={name} />
    </div>
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
        Le carbone a une durée de vie comprise entre 100 et 1 000 ans environ
      </p>
    {/if}
  {/if}
</div>

<style>
  .lm-climat-scale_bar-wrapper {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 40px 70px var(--lm-col-width);
    transition: opacity 400ms;
    position: relative;
    font-family: var(--ff-marr-sans);
    font-size: 16px;
    color: #a4a9b4;
    align-items: center;
  }

  .lm-climat-scale_bar-wrapper--visible {
    transition: opacity 1000ms;
  }

  .lm-climat-scale_bar-wrapper--ch4.lm-climat-scale_bar-wrapper--visible {
    transition: opacity 1000ms;
  }

  .lm-climat-scale_bar-wrapper--co2.lm-climat-scale_bar-wrapper--visible {
    transition: opacity 1000ms;
  }

  .lm-climat-scale_bar-note {
    transition: opacity 600ms;
    position: absolute;
    top: 2em;
    left: 125px;
    line-height: 140%;
  }

  .lm-climat-scale_bar-image {
    font-size: 0;
  }

  .lm-climat-scale_bar-image img {
    width: 100%;
  }

  .lm-climat-scale_bar-name,
  .lm-climat-scale_bar-label {
    font-weight: 500;
    line-height: 30px;
    position: relative;
    top: 0.1em;
  }

  .lm-climat-scale_bar-name {
    padding-left: 16px;
  }

  .lm-climat-scale_bar-label {
    padding-left: 32px;
  }

  .lm-climat-scale_bar {
    display: flex;
    align-items: center;
  }

  .lm-climat-scale_bar-shape {
    margin-left: 20px;
  }

  .lm-climat-scale_bar-shape--dotted,
  .lm-climat-scale_bar-shape {
    border-bottom: 1px solid #ff7a00;
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
    background-color: #ff7a00;
    position: absolute;
    top: -5px;
  }

  .lm-climat-scale_bar-shape::after,
  .lm-climat-scale_bar-shape--dotted::after {
    right: -12px;
  }

  .lm-climat-scale_bar-shape--dotted {
    border-bottom: 1px dashed #ff7a00;
  }

  @media screen and (max-width: 800px) {
    .lm-climat-scale_bar-wrapper {
      grid-template-columns: 40px 1fr;
      margin-bottom: 18px;
      font-size: 14px;
    }

    .lm-climat-scale_bar {
      grid-column: 1 / 3;
    }

    .lm-climat-scale_bar-shape {
      margin-left: 0;
    }

    .lm-climat-scale_bar-note {
      top: 5em;
      left: 0;
    }

    .lm-climat-scale_bar-label {
      padding-left: 26px;
    }
  }

  @media screen and (max-width: 320px) {
  }
</style>
