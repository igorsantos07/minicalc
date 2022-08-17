<script context="module">let counter = 0</script>
<script>
  import Switch from '@smui/switch'
  import { setContext } from 'svelte'

  export let checked = null, left = '', right = ''
  if (!left  && !$$slots.left)  console.warn('<TwoSidedSwitch> was created without expected prop/slot \'left\'')
  if (!right && !$$slots.right) console.warn('<TwoSidedSwitch> was created without expected prop/slot \'right\'')

  let id = 'two-sided-switch-' + counter++
  setContext('SMUI:generic:input:props', { id })
</script>

<div class="mdc-form-field"><!-- must be done manually to include two labels -->
  <label for={id}>{#if $$slots.left}<slot name="left"/>{:else if left}{left}{/if}</label>
  <Switch bind:checked icons={false}/>
  <label for={id}>{#if $$slots.right}<slot name="right"/>{:else if right}{right}{/if}</label>
</div>
