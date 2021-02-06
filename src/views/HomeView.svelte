<script>
    import { onMount } from "svelte";
    import Card from "../components/UI/Card.svelte";
    import { fetchAssets } from "../utils/http";
    import { push, pop, replace } from "svelte-spa-router";

    let assets = [];
    onMount(async () => {
        assets = (await fetchAssets()).categories[0].videos;
    });

    const onCardEnter = (assetId) => {
        push(`/player/${assetId}`);
    };

    export let currentRoute, params;
</script>

<div class="view home">
    <h1>HOME</h1>
        {#each assets as asset, i}
            <Card
                id={"home_card"+i}
                assetId={i}
                image={asset.thumb}
                title={asset.title}
                description={asset.description}
                subtitle={asset.subtitle}
                onEnter={() => {
                    onCardEnter(i);
                }}
            />
        {/each}
</div>
