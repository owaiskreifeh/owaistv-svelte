<svelte:options accessors />

<script>
    import {
        afterUpdate,
        getContext,
        createEventDispatcher,
        onMount,
    } from "svelte";
    import { CTX_KEY_NAV } from "../../utils/ctx_keys";
    import { KeyEvent } from "../../utils/navigation/KeyEvent";
    export let className = "",
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
        dispatchEvent("enter", ev);
        ev.preventDefault();
    }

    function onKeyDown(ev) {
        if (ev.keyCode == KeyEvent.DOM_VK_RETURN) {
            dispatchEvent("enter", ev);
            ev.preventDefault();
        }
    }

    const updateFocusState = () => {
        if (innerRef && $currentFocused == innerRef) {
            focused = true;
            dispatchEvent("focus", $currentFocused);
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
                if (
                    $currentFocused &&
                    $currentFocused.parentElement !== innerRef
                ) {
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

    onMount(() => {
        ref = innerRef;
    });
</script>

<a
    class={` ${className} focusable${focused ? " focused" : ""}`}
    {style}
    on:click={onClick}
    on:keydown={onKeyDown}
    href
    {id}
    bind:this={innerRef}
    {...$$restProps}
>
    <slot />
</a>
