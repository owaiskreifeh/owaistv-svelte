<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";

    import Idle from "../../utils/idle";
    import Focusable from "../HOC/Focusable.svelte";
    export let url, onEvent, posterImage;
    let videoElement,
        playerControls,
        playState,
        playerControlsShown,
        idleUnsubscribe;

    function play() {
        videoElement.play();
        console.log("playing");
        if (!idleUnsubscribe) {
            idleUnsubscribe = Idle.instance.subscribe(
                5000,
                () => {
                    updatePlayerControlsVisibility(true);
                },
                () => {
                    updatePlayerControlsVisibility(false);
                }
            );
        }
    }

    function pause() {
        videoElement.pause();
        console.log("paused");
        if (idleUnsubscribe) {
            idleUnsubscribe();
        }
        updatePlayerControlsVisibility(false);
        idleUnsubscribe = null;
    }

    function handelPlayerEvents(ev) {
        onEvent(ev);
        switch (ev.type) {
            case "play":
                playState = "playing";
                break;
            case "pause":
                playState = "paused";
                break;
        }
    }

    function updatePlayerControlsVisibility(shown) {
        playerControlsShown = shown;
    }

    onMount(() => {
        console.log("player mounted");
    });
</script>

<div class="player-view">
    <div class="player">
        <video
            poster={posterImage}
            src={url}
            bind:this={videoElement}
            on:play={handelPlayerEvents}
            on:pause={handelPlayerEvents}
            on:waiting={handelPlayerEvents}
        >
            <track kind="captions" />
        </video>
    </div>
    <div
        class={`player-controls ${playerControlsShown && "hidden"}`}
        bind:this={playerControls}
    >
        <Focusable type="area">
            <Focusable className="btn-player-controller" onEnter={play}>
                PLAY
            </Focusable>
            <Focusable className="btn-player-controller" onEnter={pause}>
                PAUSE
            </Focusable>
            <Focusable className="btn-player-controller" onEnter={pop}>Back</Focusable>
        </Focusable>
        <Focusable type="area" focusLast={false}>
            <Focusable className="btn-player-controller" onEnter={play}>
                PLAY
            </Focusable>
            <Focusable className="btn-player-controller" onEnter={pause}>
                PAUSE
            </Focusable>
            <Focusable className="btn-player-controller" onEnter={pop}>Back</Focusable>
        </Focusable>
        <Focusable type="area" >
            <Focusable className="btn-player-controller" onEnter={play}>
                PLAY
            </Focusable>
            <Focusable className="btn-player-controller" onEnter={pause}>
                PAUSE
            </Focusable>
            <Focusable className="btn-player-controller" onEnter={pop}>Back</Focusable>
        </Focusable>
    </div>
</div>
