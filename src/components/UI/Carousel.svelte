<script>
    import { createEventDispatcher, onMount } from "svelte";
    import Focusable from "../HOC/Focusable.svelte";
    export let data = [],
        renderElement,
        direction = "horizontal",
        propsMutator = (itemData) => itemData,
        focusLast=false;

    let sliderRef,
        refs = [],
        pxpf = 50;

    const dispatchEvent = createEventDispatcher();
    const onItemEnter = index => {
        dispatchEvent("item-enter", { index, data: data[index] })
    }

    const onItemFocus = (index) => {
        dispatchEvent("move", { index, data: data[index] });
        let itemOffset = refs[index].offsetLeft,
        sliderOffset = direction == "horizontal" ? sliderRef.scrollLeft : sliderRef.scrollTop;
        smoothscrollTo(itemOffset - pxpf * 1.2, sliderOffset, direction)
    };

    const smoothscrollTo = (offset, startFrom) => {
        let moved = startFrom;
        const move = () => {
            if (offset > startFrom && moved >= offset || offset < startFrom && moved <= offset) return;
            const movePx = pxpf
            sliderRef[direction == "horizontal" ? "scrollLeft" : "scrollTop"] = moved;
            moved = moved + (startFrom > offset ? -1 * movePx : movePx)
            requestAnimationFrame(move)
        }
        move();
    }


    onMount(()=>{
        sliderRef.addEventListener("keydown", (e) => {
            e.preventDefault();
            return false;
        });
    })

</script>

<div class="carousel">
    <Focusable
        type="area"
        focusLast={focusLast}
        class="carousel-slider {direction}"
        bind:ref={sliderRef}
    >
        {#each data as itemData, i}
            <Focusable
                bind:ref={refs[i]}
                on:focus={() => {
                    onItemFocus(i);
                }}
                on:enter={()=>{
                    onItemEnter(i);
                }}
            >
                <div class="item">
                    <svelte:component this={renderElement} {...propsMutator(itemData)}/>
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
        /* border: blue solid 1px; */
    }

    .carousel :global(.carousel-slider) {
        /* border: rgb(192, 12, 132) solid 1px; */
        display: flex;
        margin: 0;
        padding: 1em;
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
        margin: 0 1em;
    }
</style>
