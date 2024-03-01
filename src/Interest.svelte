<script>
  import { differenceInBusinessDays, differenceInDays } from 'date-fns'
  import InputDate from './components/form/InputDate.svelte'
  import InputNumber from './components/form/InputNumber.svelte'
  import TwoSidedSwitch from './components/form/TwoSidedSwitch.svelte'
  import Content, { Cash, Pct, Results } from './components/layout/Content'
  import Tooltip from './components/Tooltip.svelte'
  import { CDI } from './globals'
  import { interestYtoD, irpf } from './util'

  let sameDates
  let useCDI = true, start, end, initial, pct, cdi = CDI
  let grossPerYear, gross, net, days, workDays, result, total, hasResult, subtitle

  $: if (start && end) {
    workDays  = Math.abs(differenceInBusinessDays(end, start))
    days      = Math.abs(differenceInDays(end, start))
    subtitle  = workDays > 1 ? 'dias úteis' : 'dia útil'
    sameDates = (workDays === 0)
  }
  $: if (workDays !== undefined && initial && pct && (!useCDI || cdi > 0)) {
    hasResult    = true
    grossPerYear =  (useCDI? cdi / 100 : 1) * (pct / 100)
    gross        = ((1+interestYtoD(grossPerYear)) ** workDays) - 1
    net          = gross * (useCDI? (1 - irpf(days)) : 1)
    result       = initial * net
    total        = initial + result
  } else {
    hasResult = false
  }
</script>

<Content>
  <svelte:fragment slot="desc">
    Rendimento e juros, pelo CDI.<br/>
    <a href="https://www3.bcb.gov.br/CALCIDADAO/publico/exibirFormCorrecaoValores.do?method=exibirFormCorrecaoValores&aba=5">Use a evolução do CDI para datas passadas</a>.
  </svelte:fragment>

  <svelte:fragment slot="input">
    <TwoSidedSwitch left="Juros comum" bind:checked={useCDI}>
      <svelte:fragment slot="right">Usar o <Tooltip content="Incidirá o IRPF pela tabela regressiva">CDI</Tooltip></svelte:fragment>
    </TwoSidedSwitch>
    <InputNumber label="CDI" suffix="%" variant="outlined" bind:value={cdi} disabled={!useCDI}/>
    <hr/>
    <InputDate label="Data inicial" autoFocus bind:date={start} invalid={sameDates}/>
    <InputDate label="Data final" bind:date={end} invalidMsg={sameDates && 'As datas são... iguais?'}/>
    <InputNumber label="Valor inicial" prefix bind:value={initial}/>
    <InputNumber label={useCDI?'Percentual do CDI':'Juros anual'} suffix="%" bind:value={pct}/>
  </svelte:fragment>

  <Results slot="output" {hasResult}>
    <span slot="subtitle" class={sameDates && 'text-bold text-error'}>
      {#if workDays !== undefined}{workDays} {subtitle}{/if}
    </span>
    <Pct n={grossPerYear} title="Juros anual"/>
    <Pct n={net} title="Juros líquido"/>
    <Cash n={result} title="Rendimento"/>
    <Cash n={total} title="Total"/>
  </Results>
</Content>
