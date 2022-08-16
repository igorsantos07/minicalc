<script>
  import Paper, { Content, Subtitle, Title } from '@smui/paper'
  import DataTable, { Cell, Row } from '@smui/data-table'
  import InputNumber from './components/InputNumber.svelte'
  import Cash from './components/num/Cash.svelte'
  import Pct from './components/num/Pct.svelte'

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

  <Paper square color={hasResult? (yay? 'success' : 'error') : 'disabled'} elevation={hasResult? 10 : 0}>
    <Title>
      Resultados
      {#if hasResult}<Subtitle><em>{yay? 'Yay! 🎉' : 'Whoops... 👀'}</em></Subtitle>{/if}
    </Title>
    <Content>
      {#if hasResult}
        <DataTable class="mdc-data-table--glass">
          <Row>
            <Cell>Rendimento</Cell>
            <Cell numeric><h6 style:margin="0"><Cash n={result}/></h6></Cell>
          </Row>
          <Row>
            <Cell>Percentual</Cell>
            <Cell numeric><h6 style:margin="0"><Pct n={pct}/></h6></Cell>
          </Row>
        </DataTable>
      {:else}
        <small><em>Preencha os valores acima</em> 🙃</small>
      {/if}
    </Content>
  </Paper>
</main>
