<script>
  import Input from './Input.svelte'

  //we could spread $$props, but it's (1) "underperformant" and (2) non-autocompletable
  export let label,
             input      = null,
             prefix     = null,
             suffix     = null,
             helper     = null,
             autoFocus  = false,
             invalid    = false,
             invalidMsg = null,
             disabled   = false,
             value      = null,
             variant    = null
  export let min        = 0,
             step       = 0.05

  if (prefix === true) {
    prefix = 'R$'
  }
</script>

<Input type="number"
       {autoFocus} {disabled} {invalid} {invalidMsg}
       {label} {prefix} {suffix} {variant}
       {min} {step}
       bind:input bind:value
>
  <svelte:fragment slot="helper">{#if $$slots.helper}<slot name="helper"/>{:else if helper}{helper}{/if}</svelte:fragment>
</Input>
