<script>
  import Textfield from '@smui/textfield'
  import FormField from '@smui/form-field'
  import { onMount } from 'svelte'

  export let label, type, prefix, input, autoFocus = false, full = false, value = null
  let style = full? 'width:100%' : ''

  onMount(() => {
    if (autoFocus) {
      input.getElement().focus()
    }
  })
</script>

<FormField {style}>
  <Textfield
    {style} variant="filled"
    {prefix} {type} {label} bind:value bind:input
  />
</FormField>
