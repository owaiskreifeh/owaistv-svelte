<script>
    import Router from "svelte-spa-router";
    import { routes } from "./utils/routes";
    import {
        trackFocusables,
        clearFocusalbes,
    } from "./utils/navigation/navigation";
    import Navigable from "./components/HOC/Navigable.svelte";
</script>

<main id="main-app">
    <Navigable>
        <Router
            {routes}
            on:routeLoaded={trackFocusables}
            on:routeLoading={clearFocusalbes}
        />
    </Navigable>
</main>
