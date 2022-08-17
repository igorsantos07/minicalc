<script>
  import HelperText from '@smui/textfield/helper-text'
  import InputNumber from './components/form/InputNumber.svelte'
  import Content, { Cash, Results } from './components/layout/Content'
  import RawPct from './components/num/Pct.svelte'
  import Tooltip from './components/Tooltip.svelte'
  import { interestYtoD, interestYtoM, irpf } from './util'

  const urlCRICRA = 'https://www.infomoney.com.br/guias/cri-cra/#:~:text=Por%20outro%20lado%2C%20uma%20desvantagem%20%C3%A9%20o%20fato%20de%20que%20CRIs%20e%20CRAs%20n%C3%A3o%20s%C3%A3o%20cobertos%20pelo%20Fundo%20Garantidor%20de%20Cr%C3%A9ditos%20(FGC).'

  let hasResult
  let cdi     = 13.65
  let months, value, lci = 85, lcipre, cdb = 110, cdbpre
  let results = { lci: null, lcipre: null, cdb: null, cdbpre: null }

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

  $: if (cdi && months && value && lci && lcipre && cdb && cdbpre) {
    hasResult      = true

    console.log((1+interestYtoD(cdi/100) * .85)**21, fullInterest(lci,true), (1 + interestYtoM(cdi / 100)) ** 12, (fullInterest(lci, true)-1)*100)
    results.lci    = value * fullInterest(lci, true) //ERRADO, tem q dar 5139.12
    results.lcipre = value * fullInterest(lcipre)
    results.cdb    = applyIRPF(value, cdb, true)
    results.cdbpre = applyIRPF(value, cdbpre)
  } else {
    hasResult = false
  }
</script>

<Content desc="Compara papéis comuns de Renda Fixa, tanto os que pagam IR quanto os isentos.">
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

  <!--  FIXME: sort the results, maybe colorize then, and show in-between the difference between each position -->
  <Results slot="output" {hasResult}
           tooltipTitle='"Tá diferente do que eu vi em outro site!"'
           tooltip="Isso é esperado, visto que há diferentes metodologias de calcular o rendimento final... <em>São 30 ou 31 dias no mês? E dias úteis, 20, 21 ou 22? E no ano? Como considerar o juros mensal ou anual vs. dias no período investido?</em><br/>O importante é que a comparação vai estar precisa, visto que todos os valores aqui usam a mesma metodologia 🙃">
    <div slot="subtitle" style:display={months? 'block' : 'none'}>
      <RawPct prefix="IRPF:" n={irpf(months * 30)}/>
    </div>
    <Cash n={results.lci} title="LCI/LCA pós"/>
    <Cash n={results.cdb} title="CDB/LC pós"/>
    <Cash n={results.cdbpre} title="CDB/LC pré"/>
    <Cash n={results.lcipre} title="LCI/LCA pré"/>
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
