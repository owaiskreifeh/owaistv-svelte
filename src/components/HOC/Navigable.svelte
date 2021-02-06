<script>
    import { onDestroy, onMount, setContext } from "svelte";
    import { writable } from "svelte/store";

    import { initSpatialNavigation } from "./../../utils/navigation/navigation";
    import { CTX_KEY_NAV } from "../../utils/ctx_keys";

    let spatialNavigator = null,
        currentFocused = writable(null);

    const ids = [],
        classes = ["focusable"];

    const onFocus = (elem) => {
        $currentFocused = elem;
        elem.focus();
    };

    const onBlur = (elem) => {
        /** Do nth for now */
        elem.blur();
    };

    const onEnter = (elem) => {
        /** Do nth for now */
    };

    spatialNavigator = initSpatialNavigation({
        navigableClasses: classes,
        navigableIds: ids,
        onFocusElement: onFocus,
        onUnfocusElement: onBlur,
        onEnterElement: onEnter,
    });
    setContext(CTX_KEY_NAV, {
        spatialNavigator: spatialNavigator.instance,
        currentFocused,
    });

    onDestroy(() => {
        if (spatialNavigator) {
            spatialNavigator.destroy();
        }
    });
</script>

<slot />
