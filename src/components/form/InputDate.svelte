<script>
  import IconButton from '@smui/icon-button'
  import { Suffix } from '@smui/textfield'
  import Input from './Input.svelte'

  export let label, autoFocus = false, full = false, value = null, date = undefined
  /** @type {{getElement():HTMLInputElement}} */
  let input
</script>

<!-- on:change because we don't want to bind with valueAsDate directly in the generic input -->
<Input type="date"
       {label} {full} {autoFocus}
       bind:input bind:value on:change={e => date = e.target.valueAsDate}
>
  <Suffix slot="suffix">
    <IconButton size="button" on:click={() => input.getElement().showPicker()}>📆</IconButton>
  </Suffix>
</Input>
