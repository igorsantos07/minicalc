<script>
  import InputNumber from './components/form/InputNumber.svelte'
  import Content, { Cash, Pct, Results } from './components/layout/Content'

  let oldValue, newValue, result, pct, hasResult, yay

  $: if (oldValue && newValue) {
    hasResult = true
    result    = newValue - oldValue
    pct       = result / oldValue
    yay       = result >= 0
  } else {
    hasResult = false
  }
</script>

<Content>
  <svelte:fragment slot="input">
    <InputNumber label="Valor anterior" prefix full autoFocus bind:value={oldValue}/>
    <InputNumber label="Valor atual" prefix full bind:value={newValue}/>
  </svelte:fragment>

  <Results slot="output" {hasResult} {yay} subtitle={hasResult? (yay? 'Yay! 🎉' : 'Whoops... 👀') : ''}>
    <Cash title="Rendimento" n={result}/>
    <Pct title="Percentual" n={pct}/>
  </Results>
</Content>
