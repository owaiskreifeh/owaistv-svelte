<script>
    import { afterUpdate, getContext, createEventDispatcher, onMount } from "svelte";
    import { CTX_KEY_NAV } from "../../utils/ctx_keys";

    export let onEnter,
        className = "",
        style = "",
        ref = null,
        id = null,
        type = "element",
        focusLast = true;
    export { className as class };
    let innerRef, focused, lastFocusedChild;
    const dispatchEvent = createEventDispatcher();

    const { spatialNavigator, currentFocused } = getContext(CTX_KEY_NAV);

    function onClick(ev) {
        dispatchEvent("enter", ev)
        ev.preventDefault();
    }

    const updateFocusState = () => {
        if (innerRef && $currentFocused == innerRef) {
            focused = true;
            dispatchEvent("focus", $currentFocused)
            if (type == "area") {
                spatialNavigator.remove($currentFocused);
                spatialNavigator.focus(
                    focusLast && lastFocusedChild
                        ? lastFocusedChild
                        : $currentFocused.firstElementChild
                );
                focused = false; // remove focus class if area
            }
        } else {
            focused = false;
            if (type == "area") {
                if ($currentFocused && $currentFocused.parentElement !== innerRef) {
                    spatialNavigator.add(innerRef);
                } else {
                    lastFocusedChild = $currentFocused;
                }
            }
        }
    };

    updateFocusState();

    afterUpdate(() => {
        updateFocusState();
    });

    onMount(()=>{
        ref = innerRef;
    })
</script>
<svelte:options accessors/>
<a
    class={` ${className} focusable${focused ? " focused" : ""}`}
    style={style}
    on:click={onClick}
    href
    {id}
    bind:this={innerRef}
>
    <slot />
</a>
