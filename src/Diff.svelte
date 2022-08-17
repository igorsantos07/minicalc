<script>
  import Paper from '@smui/paper'
  import InputNumber from './components/form/InputNumber.svelte'
  import Results, { CashResult, PctResult } from './components/results'

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

<main style="max-width: 300px">
  <Paper elevation="3">
    <InputNumber label="Valor anterior" prefix full autoFocus bind:value={oldValue}/>
    <InputNumber label="Valor atual" prefix full bind:value={newValue}/>
  </Paper>

  <Results {hasResult} {yay} subtitle={hasResult? (yay? 'Yay! 🎉' : 'Whoops... 👀') : ''}>
    <CashResult title="Rendimento" n={result}/>
    <PctResult title="Percentual" n={pct}/>
  </Results>
</main>
