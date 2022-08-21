<script>
  import Paper from '@smui/paper'
  import Description from './_Description.svelte'

  export let desc = null, large = false
</script>

{#if $$slots.desc}
  <Description><slot name="desc"/></Description>
{:else if desc}
  <Description>{desc}</Description>
{/if}

<main class:large>
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

    @mixin columns {
      flex-direction: column;
      align-items: center;
    }

    @include breakpoint-tiny { @include columns }
    @include breakpoint-not-big { &.large { @include columns } }

    :global .smui-paper {
      &:first-of-type {
        width: 240px;
        max-width: 300px;
        @include breakpoint-not-tiny { margin-right: 20px; }
      }
      hr {
        margin: 8px -18px;
        color: black;
        opacity: 0.5;
      }
    }
  }
</style>
