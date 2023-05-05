<script>
  export let element;
  export let visible;
  export let scale;
  export let wrapperWidth;

  const { id, value, name, label } = element;

  $: spaceForText = wrapperWidth < 400 ? 210 : 270;
  $: maxDiameter = Math.min(wrapperWidth - spaceForText, 250);
  $: maxArea = Math.PI * Math.pow(maxDiameter/2, 2);

  $: area = value / scale * maxArea
  $: diameter = (Math.sqrt( area / Math.PI )) * 2

  $: size = visible ? diameter : 0;

  $: imageUrl = `https://assets-decodeurs.lemonde.fr/redacweb/2302-rechauffement-scale-anim/${id}.svg`;

  $: wrapperStyle = `
    --lm-col-width: ${maxDiameter}px;
    opacity: ${visible ? 1 : 0}; 
  `;
  $: circleStyle = `width: ${size}px; height: ${size}px;`;
</script>

<div class="lm-climat-scale_circle-wrapper" style={wrapperStyle}>
  {#if wrapperWidth > 0}
    <div class="lm-climat-scale_bar-image">
      <img src={imageUrl} alt={name} />
    </div>
    <p class="lm-climat-scale_circle-name">{name}</p>
    <div class="lm-climat-scale_circle-shape" style={circleStyle} />
    <p class="lm-climat-scale_circle-label">{label}</p>
  {/if}
</div>

<style>
  .lm-climat-scale_circle-wrapper {
    margin-bottom: 38px;
    transition: opacity 1000ms;
    display: grid;
    grid-template-columns: 60px 90px var(--lm-col-width) 120px;
    align-items: center;
    font-family: var(--ff-marr-sans);
    color: #a4a9b4;
    font-size: 16px;
  }

  .lm-climat-scale_circle-wrapper:last-child {
    margin-bottom: 0;
  }

  .lm-climat-scale_bar-image {
    font-size: 0;
  }

  .lm-climat-scale_bar-image img {
    width: 100%;
    max-width: 60px;
  }

  .lm-climat-scale_circle-name {
    padding-left: 16px;
    font-weight: 600;
    color: #fff;
  }

  .lm-climat-scale_circle-label {
    padding-left: 20px;
    font-weight: 500;
  }

  .lm-climat-scale_circle-shape {
    border-radius: 100%;
    transition: width 1600ms, height 1600ms;
    background-color: #ff7a00;
    justify-self: center;
  }

  @media screen and (max-width: 800px) {
    .lm-climat-scale_circle-wrapper {
      font-size: 14px;
      grid-template-columns: 50px 90px var(--lm-col-width) 90px;
    }
  }

  @media screen and (max-width: 400px) {
    .lm-climat-scale_circle-wrapper {
      grid-template-columns: 40px 75px var(--lm-col-width) 90px;
    }
  }
</style>
