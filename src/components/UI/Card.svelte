<script>
    export let image, description=null, title=null;
</script>

<div class="card">
    <img src={image} alt="Avatar" style="width:100%" />
    {#if title || description}
        <div class="container">
            {#if title}
                <h4><b>{title}</b></h4>
            {/if}
            {#if description}
                <p>
                    {description}
                </p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .card {
        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 30vw;
    }

    /* On mouse-over, add a deeper shadow */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    /* Add some padding inside the card container */
    .container {
        padding: 2px 16px;
    }
</style>
