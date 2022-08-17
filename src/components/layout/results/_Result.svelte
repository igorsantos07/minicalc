<script>
  import { Cell, Row } from '@smui/data-table'

  export let title
  export let type
  export let n
  export let small = false
</script>

<Row>
  <Cell>{title}</Cell>
  <Cell numeric>
    <h6 style:margin={0}>
      {#if small}
        <small>
          <b>
            <svelte:component this={type} {n}/>
          </b>
        </small>
      {:else}
        <svelte:component this={type} {n}/>
      {/if}
    </h6>
  </Cell>
</Row>
