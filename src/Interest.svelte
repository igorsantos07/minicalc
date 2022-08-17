<script>
  import { differenceInBusinessDays, differenceInDays } from 'date-fns'
  import InputDate from './components/form/InputDate.svelte'
  import InputNumber from './components/form/InputNumber.svelte'
  import Content, { Cash, Pct, Results } from './components/layout/Content'
  import { interestYtoD, irpf } from './util'

  let start, end, initial, pct, cdi = 13.65
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

<Content desc="Rendimento e juros, pelo CDI, entre duas datas.">
  <svelte:fragment slot="input">
    <InputNumber label="CDI" suffix="%" variant="outlined" bind:value={cdi}/>
    <hr/>
    <InputDate label="Data inicial" autoFocus bind:date={start}/>
    <InputDate label="Data final" bind:date={end}/>
    <InputNumber label="Valor inicial" prefix bind:value={initial}/>
    <InputNumber label="Percentual do CDI" suffix="%" bind:value={pct}/>
  </svelte:fragment>

  <Results slot="output" {hasResult} subtitle={workDays? `${workDays} ${subtitle}` : ''}>
    <Pct n={grossPerYear} title="Juros anual"/>
    <Pct n={net} title="Juros líquido"/>
    <Cash n={result} title="Rendimento"/>
    <Cash n={total} title="Total"/>
  </Results>
</Content>
