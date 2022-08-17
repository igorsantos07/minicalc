<script>
  import Tooltip, { Wrapper } from '@smui/tooltip'

  export let content
</script>

<Wrapper>
  <span><slot/></span>
  <Tooltip persistent xPos="center">
    {#if $$slots.content}
      <slot name="content"/>
    {:else if content}
      {@html content}
    {/if}
  </Tooltip>
</Wrapper>

<style lang="scss">
  span {
    text-decoration: underline dotted black;
    cursor: help;
  }
</style>
