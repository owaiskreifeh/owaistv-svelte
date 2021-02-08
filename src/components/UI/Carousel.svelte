<script>
    import "@glidejs/glide/dist/css/glide.core.css";
    import "@glidejs/glide/dist/css/glide.theme.css";
    import Glide from "@glidejs/glide";
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    const glide = new Glide(".glide", {
        keyboard: false,
        perView: 3,
        classes: {
            activeSlide: "active"
        }
    });
    onMount(() => {
        glide.mount();
    });
</script>

<div class="glide">
    <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
            {#each [1, 2, 3, 4, 5, 6, 7] as i}
                <li class="glide__slide">
                    <div class="item">
                        {i}
                       
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .item {
        width: 200px;
    }
    
    .active{
        border: 10px solid red;
    }
</style>
