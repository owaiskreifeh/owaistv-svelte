<script>
    import { onMount } from "svelte";

    import Player from "../components/Player/Player.svelte";
    import { fetchAsset } from "../utils/http";

    export let params;
    let asset;

    onMount(async () => {
        asset = await fetchAsset(params.assetId);
    });
</script>

<div class="view player">

    {#if asset}
        <Player
            posterImage={asset.thump}
            url={asset.sources[0]}
            onEvent={console.log}
        />
    {/if}


    
</div>
