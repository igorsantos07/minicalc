<script>
  import FormField from '@smui/form-field'
  import Textfield from '@smui/textfield'
  import { mapKeys } from 'lodash-es'
  import { onMount } from 'svelte'

  export let label, type,
             prefix = null,
             suffix = null,
             input = null,
             autoFocus = false,
             value = null,
             variant = null

  //anything undeclared can be passed directly to the input, thus, we need to prefix it
  const inputRestProps = mapKeys($$restProps, (_, key) => `input$${key}`)
  suffix = suffix? `${suffix}` : null

  onMount(() => {
    if (autoFocus) {
      input.getElement().focus()
    }
  })
</script>

<FormField>
  <Textfield
    variant={variant || 'filled'}
    {prefix} {suffix} {type} {label} {...inputRestProps} bind:value bind:input on:change
  >
    <svelte:fragment slot="suffix"><slot name="suffix"/></svelte:fragment>
    <svelte:fragment slot="helper"><slot name="helper"/></svelte:fragment>
  </Textfield>
</FormField>

<style lang="scss">
  :global {
    .mdc-form-field {
      //respecting helper text (not sure why those rules should be really needed, but...)
      flex-direction: column;
      align-items: flex-start;
    }
    .mdc-form-field, .mdc-text-field { width: 100% }
  }
</style>
