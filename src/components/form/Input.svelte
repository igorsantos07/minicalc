<script>
  import FormField from '@smui/form-field'
  import Textfield from '@smui/textfield'
  import { mapKeys } from 'lodash-es'
  import { onMount } from 'svelte'

  export let label, type,
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

  //anything undeclared can be passed directly to the input, thus, we need to prefix it
  const inputRestProps = mapKeys($$restProps, (_, key) => `input$${key}`)
  suffix = suffix? `${suffix}` : null

  let inputProxy
  onMount(() => {
    input = inputProxy.getElement()
    if (autoFocus) {
      input.focus()
    }
  })

  $: if (invalidMsg) {
    invalid = true
  }
</script>

<FormField class="text-input">
  <Textfield
    variant={variant || 'filled'}
    {disabled} {invalid} {prefix} {suffix} {type} {label} {...inputRestProps} bind:value bind:input={inputProxy} on:change
  >
    <svelte:fragment slot="suffix"><slot name="suffix"/></svelte:fragment>
    <svelte:fragment slot="helper">
      {#if $$slots.helper}<slot name="helper"/>{:else if helper}{helper}{/if}
      {#if invalidMsg}
        {#if $$slots.helper || helper}<br/>{/if}
        <span class="text-error">{invalidMsg}</span>
      {/if}
    </svelte:fragment>
  </Textfield>
</FormField>

<style lang="scss">
  :global {
    .mdc-form-field.text-input { //for some odd reason, I can't just use "input" to target that FormField?
      //respecting helper text (not sure why those rules should be really needed, but...)
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      .mdc-text-field { width: 100% }
    }
  }
</style>
