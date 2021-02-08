<script>
    import { onMount } from "svelte";
    import Card from "../components/UI/Card.svelte";
    import { fetchAssets } from "../utils/http";
    import { push, pop, replace } from "svelte-spa-router";
    import Focusable from "../components/HOC/Focusable.svelte";
import Carousel from "../components/UI/Carousel.svelte";

    export let params;
    let assets;
    onMount(async () => {
        assets = await fetchAssets();
    });

    const onCardEnter = (assetId) => {
        push(`/player/${assetId}`);
    };
</script>

<div class="view home">

    <h1>HOME</h1>

    <h2>Carousel</h2>
    <Carousel></Carousel>
    {#if assets}
        {#each assets.categories as asset, k}
            <h3>{asset.name}</h3>
            <Focusable type="area" class="grid" focusLast={false}>
                {#each asset.videos as video, i}
                    <Card
                        id={"home_card" + i}
                        assetId={i}
                        image={video.thumb}
                        title={video.title}
                        description={video.description}
                        subtitle={video.subtitle}
                        on:enter={() => {
                            onCardEnter(i);
                        }}
                    />
                {/each}
            </Focusable>
        {/each}
    {/if}
</div>

<style>
    .view :global(.grid) {
        display: flex;
    }
    .view :global(.grid > .focusable) {
        max-width: 30vw;
        min-width: 30vw;
        margin: 1em;
    }
</style>
