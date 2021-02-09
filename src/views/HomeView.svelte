<script>
    import { onMount } from "svelte";
    import Card from "../components/UI/Card.svelte";
    import { fetchAssets } from "../utils/http";
    import { push } from "svelte-spa-router";
    import Carousel from "../components/UI/Carousel.svelte";

    export let params;
    let assets;
    onMount(async () => {
        assets = await fetchAssets();
    });

    const onCardEnter = (ev) => {
        console.log(ev)
        return;
        push(`/player/${assetId}`);
    };

    const onCarouselFocus = () => {
    }
</script>

<div class="view home">
    <h1>HOME</h1>

    <h2>Carousel</h2>
    {#if assets}
        {#each assets.categories as asset, k}
            <h3>{asset.name}</h3>
            <Carousel 
                focusLast={true} 
                on:item-enter={onCardEnter}
                on:focus={onCarouselFocus}
                data={asset.videos}
                renderElement={Card}
                propsMutator={item => ({
                    image: item.thumb,
                })}
                />
        {/each}
    {/if}
</div>

<style>
    .view.home{
        scroll-behavior: smooth;
        overflow: scroll;
        max-height: 100vh;
    }
    .view :global(.grid) {
        display: flex;
    }
    .view :global(.grid > .focusable) {
        max-width: 30vw;
        min-width: 30vw;
        margin: 1em;
    }
</style>
