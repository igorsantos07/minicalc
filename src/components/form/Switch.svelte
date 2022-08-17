<script>
  import FormField from '@smui/form-field'
  import Switch from '@smui/switch'

  export let checked = null, label = ''
  if (!label && !$$slots.label)
    console.warn('<Switch> was created without expected prop/slot \'label\'')
</script>

<FormField>
  <Switch bind:checked/>
  <svelte:fragment slot="label">{label}</svelte:fragment>
</FormField>
