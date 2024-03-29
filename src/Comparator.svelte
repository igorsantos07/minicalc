<script>
  import HelperText from '@smui/textfield/helper-text'
  import { sortBy } from 'lodash-es'
  import InputNumber from './components/form/InputNumber.svelte'
  import Content, { Cash, Results } from './components/layout/Content'
  import RawPct from './components/num/Pct.svelte'
  import Tooltip from './components/Tooltip.svelte'
  import { CDI } from './globals'
  import Result from './Result'
  import { interestYtoM, irpf } from './util'

  const urlCRICRA = 'https://www.infomoney.com.br/guias/cri-cra/#:~:text=Por%20outro%20lado%2C%20uma%20desvantagem%20%C3%A9%20o%20fato%20de%20que%20CRIs%20e%20CRAs%20n%C3%A3o%20s%C3%A3o%20cobertos%20pelo%20Fundo%20Garantidor%20de%20Cr%C3%A9ditos%20(FGC).'

  let hasResult
  let cdi = CDI
  let months, value, lci = 85, lcipre, cdb = 110, cdbpre
  let results = [
    new Result(Result.TYPE.LCI_POS, 'LCI/LCA pós'),
    new Result(Result.TYPE.CDB_POS, 'CDB/LC pós'),
    new Result(Result.TYPE.LCI_PRE, 'LCI/LCA pré'),
    new Result(Result.TYPE.CDB_PRE, 'CDB/LC pré')
  ]
  function resultFor(key) {
    return results.find(r => r.key == key)
  }

  function fullInterest(interest, withCDI = false) {
    let finalInterest = withCDI?
      interestYtoM(cdi / 100) * (interest / 100) :
      interestYtoM(interest / 100) //correto
    return (1 + finalInterest) ** months //correto
  }
  function applyIRPF(value, interest, withCDI = false) {
    let finalInterest = fullInterest(interest, withCDI)
    return value + (value * (finalInterest - 1) * (1-irpf(months * 30)))
  }

  $: if (cdi && months && value && (lci || lcipre || cdb || cdbpre)) {
    resultFor(Result.TYPE.LCI_POS).value = !lci?    false : value * fullInterest(lci, true)
    resultFor(Result.TYPE.LCI_PRE).value = !lcipre? false : value * fullInterest(lcipre)
    resultFor(Result.TYPE.CDB_POS).value = !cdb?    false : applyIRPF(value, cdb, true)
    resultFor(Result.TYPE.CDB_PRE).value = !cdbpre? false : applyIRPF(value, cdbpre)
    results   = sortBy(results, 'value').reverse()
    hasResult = true
  } else {
    hasResult = false
  }
</script>

<Content large desc="Compara papéis comuns de Renda Fixa, tanto os que pagam IR quanto os isentos.">
  <svelte:fragment slot="input">
    <InputNumber label="CDI" suffix="%" variant="outlined" bind:value={cdi}/>
    <hr/>
    <InputNumber label="Prazo" step={.1} suffix={months > 1? 'meses' : 'mês'} bind:value={months}/>
    <InputNumber label="Valor" prefix bind:value/>

    <section>
      <HelperText persistent>
        Isentos de IR: (
        <Tooltip content="<b>Lembre-se:</b> CRI e CRA <a href='{urlCRICRA}'>não possuem</a> garantia pelo FGC.">CRI/CRA</Tooltip>
        também!)
      </HelperText>
      <InputNumber label="LCI/LCA pós" suffix="%" bind:value={lci}/>
      <InputNumber label="LCI/LCA pré" suffix="%" bind:value={lcipre}/>

      <HelperText persistent>
        Nestes incide o IR:
        <Tooltip>
          <table slot="content" id="irpf">
            <tr><th>Até 180 dias (~6 meses)</th><td>22,5%</td></tr>
            <tr><th>Até 360 dias (~1 ano)</th>  <td>20%</td></tr>
            <tr><th>Até 720 dias (~2 anos)</th> <td>17,5%</td></tr>
            <tr><th>Além disso</th>             <td>15%</td></tr>
          </table>
          (tabela regressiva)
        </Tooltip>
      </HelperText>
      <InputNumber label="CDB/LC pós" suffix="%" bind:value={cdb}/>
      <InputNumber label="CDB/LC pré" suffix="%" bind:value={cdbpre}/>
    </section>
  </svelte:fragment>

  <!--  FIXME: maybe colorize results, and show in-between the difference between each position -->
  <Results slot="output" {hasResult}
           tooltipTitle='"Tá diferente do que eu vi em outro site!"'
           tooltip="Isso é esperado, visto que há diferentes metodologias de calcular o rendimento final... <em>São 30 ou 31 dias no mês? E dias úteis, 20, 21 ou 22? E no ano? Como considerar o juros mensal ou anual vs. dias no período investido?</em><br/>O importante é que a comparação vai estar precisa, visto que todos os valores aqui usam a mesma metodologia 🙃">
    <div slot="subtitle" style:display={months? 'block' : 'none'}>
      <RawPct prefix="IRPF:" n={irpf(months * 30)}/>
    </div>

    {#each results as result, i}
      <Cash n={result.value} title={result.label}/>
      {@const next = results[i+1]}
      {#if next && result.value && next.value}
        <Cash difference title="Diferença" n={result.value - next.value}/>
      {/if}
    {/each}
  </Results>
</Content>

<style lang="scss">
  @use '@material/theme/color-palette';

  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4px; //mdc-form-field is flex-column in case we add help text inside the fields, so we need this

    :global .mdc-text-field-helper-text { grid-column-end: span 2 }
  }

  table#irpf {
    white-space: nowrap;
    border-spacing: 0;
    th {
      border-right: 1px solid white;
      padding: 2px 4px 2px 0;
    }
    td { padding: 2px 0 2px 4px }
  }
</style>
