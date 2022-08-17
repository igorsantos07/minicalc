<script>
  import Paper from '@smui/paper'
  import Description from './_Description.svelte'

  export let desc = null
</script>

{#if $$slots.desc}
  <Description><slot name="desc"/></Description>
{:else if desc}
  <Description>{desc}</Description>
{/if}

<main>
  <Paper elevation="3">
    <slot name="input"></slot>
  </Paper>

  <slot name="output"/>
</main>

<style lang="scss">
  @import '../../styles/breakpoints';

  main {
    display: flex;
    justify-content: center;

    @include breakpoint-tiny {
      flex-direction: column;
      align-items: center;
    }

    :global .smui-paper {
      &:first-of-type {
        width: 240px;
        max-width: 300px;
        @include breakpoint-big { margin-right: 20px; }
      }
      hr {
        margin: 8px -18px;
        color: black;
        opacity: 0.5;
      }
    }
  }
</style>
