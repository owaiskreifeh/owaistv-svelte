<script>
    import Focusable from '../HOC/Focusable.svelte'

    export let assetId, image, description, title, subtitle, onEnter, id
</script>

<Focusable onEnter={onEnter} id={id}>
    <div class="card" >
        <img src={ image } alt="Avatar" style="width:100%">
        <div class="container">
          <h4><b>{ title }</b></h4>
          <!-- <p>{ description }</p> -->
        </div>
      </div>
</Focusable>

<style>
   .card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>
