<script>
  import IconButton from '@smui/icon-button'
  import { Suffix } from '@smui/textfield'
  import Input from './Input.svelte'

  export let label,
             input      = null,
             // prefix     = null,
             // suffix     = null,
             helper     = null,
             autoFocus  = false,
             invalid    = false,
             invalidMsg = null,
             disabled   = false,
             value      = null,
             variant    = null
  export let date       = undefined
</script>

<!-- on:change because we don't want to bind with valueAsDate directly in the generic input -->
<Input type="date"
       {autoFocus} {disabled} {invalid} {invalidMsg}
       {label} {variant}
       bind:input bind:value on:change={e => date = e.target.valueAsDate}
>
  <Suffix slot="suffix">
    <IconButton size="button" on:click={() => input.showPicker()}>📆</IconButton>
  </Suffix>

  <!--  TODO can't we simply "spread" all the slots into the parent component instead of copy-pasta?-->
  <svelte:fragment slot="helper">{#if $$slots.helper}<slot name="helper"/>{:else if helper}{helper}{/if}</svelte:fragment>
</Input>
