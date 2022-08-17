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
             full = false,
             value = null,
             variant = null
  let style = full? 'width:100%' : ''

  //anything undeclared can be passed directly to the input, thus, we need to prefix it
  const inputRestProps = mapKeys($$restProps, (_, key) => `input$${key}`)
  suffix = suffix? `${suffix}` : null

  onMount(() => {
    if (autoFocus) {
      input.getElement().focus()
    }
  })
</script>

<FormField {style}>
  <Textfield
    {style} variant={variant || 'filled'}
    {prefix} {suffix} {type} {label} {...inputRestProps} bind:value bind:input on:change
  >
    <svelte:fragment slot="suffix"><slot name="suffix"/></svelte:fragment>
  </Textfield>
</FormField>
