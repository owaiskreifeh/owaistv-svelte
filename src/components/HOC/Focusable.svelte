<script>
    import { afterUpdate, getContext } from "svelte";
    import { CTX_KEY_NAV } from "../../utils/ctx_keys";

    export let onEnter,
        className = "",
        id,
        type = "element",
        focusLast = true;
    let ref, focused, lastFocusedChild;

    const { spatialNavigator, currentFocused } = getContext(CTX_KEY_NAV);

    function onClick(ev) {
        onEnter();
        ev.preventDefault();
    }

    const updateFocusState = () => {
        console.log(ref, currentFocused, ref == $currentFocused);
        if (ref && $currentFocused == ref) {
            focused = true;
            if (type == "area") {
                console.log("area selected");
                spatialNavigator.remove($currentFocused);
                spatialNavigator.focus(
                    focusLast && lastFocusedChild
                        ? lastFocusedChild
                        : $currentFocused.firstElementChild
                );
                focused = false;// remove focus class
            }
        } else {
            focused = false;
            if (type == "area") {
                if ($currentFocused && $currentFocused.parentElement !== ref) {
                    spatialNavigator.add(ref);
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
</script>

<a
    class={` ${className} focusable${focused ? " focused" : ""}`}
    on:click={onClick}
    href
    {id}
    bind:this={ref}
>
    <slot />
</a>
