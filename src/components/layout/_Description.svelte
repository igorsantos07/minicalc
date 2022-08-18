<script>
  import Banner, { Label } from '@smui/banner'

  let open = true
</script>

<Banner bind:open centered id="top-info">
  <svelte:fragment slot="icon">Info</svelte:fragment>
  <Label slot="label"><em><slot/></em></Label>
  <svelte:fragment slot="actions"><button/></svelte:fragment>
  <!-- see https://github.com/hperrin/svelte-material-ui/pull/498 -->
</Banner>

<style lang="scss">
:global #top-info {
  .mdc-banner__graphic {
     $padding: 12px;
     padding-top: $padding;
     height: 40px - $padding;
     font: 12px var(--monospace);
   }
  .mdc-banner__content { max-width: max-content }
  .mdc-banner__text { margin: 0 12px } //skips the right margin for the action buttons

  //https://github.com/hperrin/svelte-material-ui/pull/498
  .mdc-banner__actions { width: 20px; padding: 0; position: absolute; right: 2000px; }
}
</style>
