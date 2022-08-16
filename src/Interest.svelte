<script>
  import Paper from '@smui/paper'
  import { differenceInBusinessDays, differenceInDays } from 'date-fns'
  import InputDate from './components/form/InputDate.svelte'
  import InputNumber from './components/form/InputNumber.svelte'
  import Cash from './components/num/Cash.svelte'
  import Pct from './components/num/Pct.svelte'
  import Results, { Result } from './components/results'
  import { interestYtoD, irpf } from './util'

  let start, end, initial, pct, cdi = 13.25
  let grossPerYear, gross, net, days, workDays, result, total, hasResult, subtitle

  $: if (start && end) {
    workDays = differenceInBusinessDays(end, start)
    days     = differenceInDays(end, start)
    subtitle = workDays > 1 ? 'dias úteis' : 'dia útil'
  }
  $: if (days && initial && pct) {
    hasResult    = true
    grossPerYear = (cdi / 100) * (pct / 100)
    gross        = interestYtoD(grossPerYear) * workDays
    net          = gross * (1 - irpf(days))
    result       = initial * net
    total        = initial + result
  } else {
    hasResult = false
  }
</script>

<!-- TODO: make this <main> a standard in all screens and make it a two-column layout on larger screens -->
<main style="max-width: 300px">
  <p>Calcular o rendimento e juros pelo CDI entre duas datas</p>
  <Paper elevation="3">
    <InputDate label="Data inicial" full autoFocus bind:date={start}/>
    <InputDate label="Data final" full bind:date={end}/>
    <InputNumber label="Valor inicial" prefix full bind:value={initial}/>
    <InputNumber label="CDI" suffix="%" full bind:value={cdi}/>
    <InputNumber label="Percentual do CDI" suffix="%" full bind:value={pct}/>
  </Paper>

  <Results {hasResult} subtitle={workDays? `${workDays} ${subtitle}` : ''}>
    <Result type={Pct} n={grossPerYear} title="Juros anual"/>
    <Result type={Pct} n={net} title="Juros líquido"/>
    <Result type={Cash} n={result} title="Rendimento"/>
    <Result type={Cash} n={total} title="Total"/>
  </Results>
</main>
