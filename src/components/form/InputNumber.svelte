<script>
  import Input from './Input.svelte'

  export let label,
             min = 0,
             step = 0.05,
             autoFocus = false,
             full = false,
             prefix = null,
             suffix = null,
             value = null

  if (prefix === true) {
    prefix = 'R$'
  }
</script>

<Input type="number" {label} {full} {prefix} {suffix} {min} {step} {autoFocus} bind:value/>
