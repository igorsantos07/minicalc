<script>
  import Input from './Input.svelte'

  export let label, autoFocus = false, full = false, prefix = false, value = null

  if (prefix === true) {
    prefix = 'R$'
  }
</script>

<Input type="number" {label} {full} {prefix} {autoFocus} bind:value/>
