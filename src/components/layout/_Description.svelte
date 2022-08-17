<script>
  import Banner, { Label } from '@smui/banner'

  let open = true
</script>

<Banner bind:open centered fixed>
  <svelte:fragment slot="icon">Info</svelte:fragment>
  <Label slot="label"><em><slot/></em></Label>
<!--  <svelte:fragment slot="actions">&times;</svelte:fragment>-->
</Banner>

<style lang="scss">
@import '../../styles/typography';
:global .mdc-banner {
  & &__graphic {
     $padding: 12px;
     padding-top: $padding;
     height: 40px - $padding;
     font: 12px $monospace;
   }
  & &__content { max-width: max-content }
  & &__text { margin: 0 12px } //skips the right margin for the action buttons
}
</style>
