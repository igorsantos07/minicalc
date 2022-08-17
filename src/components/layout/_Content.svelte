<script>
  import Paper from '@smui/paper'
</script>

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
        width: 200px;
        max-width: 300px;
        @include breakpoint-big { margin-right: 20px; }
      }
    }
  }
</style>
