<script>
  import { Cell, Row } from '@smui/data-table'

  export let title
  export let type
  export let n
  export let small = false
  export let difference = false
</script>

<Row>
  <Cell>{title}</Cell>
  <Cell numeric class={difference && 'difference'}>
    <h6 style:margin={0}>
      {#if !n}
        <small>
          <em class="muted">
            <svelte:component this={type} {n}/>
          </em>
        </small>
      {:else if small}
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
