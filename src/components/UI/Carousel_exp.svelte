<script>
    import { createEventDispatcher, onMount } from "svelte";
    import Focusable from "../HOC/Focusable.svelte";
    export let data = [],
        renderElement,
        direction = "horizontal";
    let sliderRef,
        refs = [],
        pxps = 200;

    const dispatchEvent = createEventDispatcher();
    const onItemFocus = (index) => {
        dispatchEvent("move", { index, data: data[index] });
        let itemOffset = refs[index].offsetLeft,
        sliderOffset = sliderRef.scrollLeft;
        smoothscrollTo(itemOffset - 40, sliderOffset)
    };

    const smoothscrollTo = (offset, startFrom) => {
        let moved = startFrom;
        const move = () => {
            if (offset > startFrom && moved >= offset || offset < startFrom && moved <= offset) return;
            const movePx = 10
            sliderRef.scrollLeft = moved;
            moved = moved + (startFrom > offset ? -1 * movePx : movePx)
            requestAnimationFrame(move)
        }
        move();
    }


    onMount(()=>{
        sliderRef.addEventListener("keydown", (e) => {
            e.preventDefault();
            return false;
        })
    })

</script>

<div class="carousel">
    <Focusable
        type="area"
        class="carousel-slider {direction}"
        bind:ref={sliderRef}
    >
        {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as item, i}
            <Focusable
                bind:ref={refs[i]}
                on:focus={() => {
                    onItemFocus(i);
                }}
            >
                <div class="item">
                    <h1>{item}</h1>
                </div>
            </Focusable>
        {/each}
    </Focusable>
</div>

<style>
    .carousel {
        padding: 0;
        margin: 0;
        overflow: hidden;
        max-height: 80vh;
        max-width: 80vw;
        border: blue solid 1px;
    }

    .carousel :global(.carousel-slider) {
        border: green solid 1px;
        display: flex;
        margin: 0;
        padding: 0;
        width: inherit;
    }
    .carousel :global(.carousel-slider.horizontal) {
        flex-direction: row;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }
    .carousel :global(.carousel-slider.vertical) {
        flex-direction: column;
        overflow-x: scroll;
        scroll-behavior: smooth;
    }

    .item {
        width: 200px;
        height: 200px;
        background-color: green;
        margin: 1em;
    }
</style>
