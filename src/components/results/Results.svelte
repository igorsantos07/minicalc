<script>
  import DataTable from '@smui/data-table'
  import Paper, { Content, Subtitle, Title } from '@smui/paper'

  import Result from './Result.svelte'

  export { Result }

  export let hasResult = false
  export let yay = true
  export let subtitle
</script>

<Paper square color={hasResult? (yay? 'success' : 'error') : 'disabled'} elevation={hasResult? 10 : 0}>
  <Title>
    Resultados
    {#if subtitle}
      <Subtitle><em><small>{subtitle}</small></em></Subtitle>
    {/if}
  </Title>

  <Content>
    {#if hasResult}
      <DataTable class="mdc-data-table--glass">
        <slot/>
      </DataTable>
    {:else}
      <small><em>Preencha os valores acima</em> 🙃</small>
    {/if}
  </Content>
</Paper>
