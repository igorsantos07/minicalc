<script>
  import InputNumber from './components/form/InputNumber.svelte'
  import Content, { Cash, Results } from './components/layout/Content'
  import RawPct from './components/num/Pct.svelte'
  import { CDI } from './globals'
  import { interestYtoM, irpf } from './util'

  let hasResult
  let cdi = CDI
  let months, value, installment, percent = 110
  let rawDiff, simpleInterest, installPaid, installInterest, diff, best

  function fullInterest(value, months) {
    const finalInterest = interestYtoM(cdi / 100) * (percent / 100)
    const interestWithIRPF = (1 + finalInterest) ** months //correto
    return value + (value * (interestWithIRPF - 1) * (1-irpf(months * 30)))
  }

  $: if (cdi && months && value && installment && percent) {
    installPaid = installment * months
    rawDiff = installPaid - value

    simpleInterest = fullInterest(rawDiff, months)
    let rawProfit = simpleInterest - rawDiff

    installInterest = 0
    for (let month = months; month >= 1; month--) {
      installInterest += fullInterest(installment, month) - installment
    }

    let simpleExpenses = (value - rawProfit)
    let installExpenses = (installPaid - installInterest)
    diff = simpleExpenses - installExpenses
    best = simpleExpenses < installExpenses? 'À vista' : 'Parcelado'

    hasResult = true
  } else {
    hasResult = false
  }
</script>

<Content large desc="Vale mais a pena o desconto do pagamento à vista, ou esticar num parcelamento?">
  <svelte:fragment slot="input">
    <InputNumber label="CDI" suffix="%" variant="outlined" bind:value={cdi}/>
    <InputNumber label="Rendimento do CDI" suffix="%" bind:value={percent}/>
    <hr/>
    <InputNumber label="Valor à vista" prefix bind:value/>
    <hr/>
    <InputNumber label="Valor da parcela" prefix bind:value={installment}/>
    <InputNumber label="Parcelas" step={1} suffix={months > 1? 'meses' : 'mês'} bind:value={months}/>
  </svelte:fragment>

  <!--  FIXME: maybe colorize results, and show in-between the difference between each position -->
  <Results slot="output" {hasResult}>
    <div slot="subtitle" style:display={months? 'block' : 'none'}>
      <RawPct prefix="IRPF:" n={irpf(months * 30)}/>
    </div>

    <Cash title={`Melhor opção: ${best}`} n={Math.abs(diff)}/>
    <Cash difference n={rawDiff} title="Desconto à vista"/>
    <Cash difference n={simpleInterest} title="Rendimento com a sobra"/>
    <Cash difference n={installPaid} title="Pago no parcelamento"/>
    <Cash difference n={installInterest} title="Rend. durante as parcelas"/>
  </Results>
</Content>
