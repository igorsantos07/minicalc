<script>
  import DataTable from '@smui/data-table'
  import Paper, { Content, Subtitle, Title } from '@smui/paper'
  import Tooltip, { Content as TBody, Title as TTitle, Wrapper } from '@smui/tooltip'

  import Result from './_Result.svelte'

  export { Result }

  export let hasResult = false
  export let yay = true
  export let subtitle
  export let tooltip, tooltipTitle
</script>

<Paper square color={hasResult? (yay? 'success' : 'error') : 'disabled'} elevation={hasResult? 10 : 0}>
  <Title>
    <span>
      Resultados
      {#if tooltip && hasResult}
        <Wrapper rich>
          <span role="button" tabindex="0">🤔</span>
          <Tooltip persistent>
            {#if tooltipTitle}<TTitle>{@html tooltipTitle}</TTitle>{/if}
            <TBody>{@html tooltip}</TBody>
          </Tooltip>
        </Wrapper>
      {/if}
    </span>

    {#if $$slots.subtitle || subtitle}
      <Subtitle>
        {#if $$slots.subtitle}
          <slot name="subtitle"/>
        {:else}
          {subtitle}
        {/if}
      </Subtitle>
    {/if}
  </Title>

  <Content>
    {#if hasResult}
      <DataTable class="mdc-data-table--glass">
        <slot/>
      </DataTable>
    {:else}
      <small><em>Preencha os valores primeiro</em> 🙃</small>
    {/if}
  </Content>
</Paper>

<style lang="scss">
  :global .mdc-tooltip-wrapper--rich {
    display: inline;
    span {
      font-size: 18px;
      cursor: pointer;
    }
  }
</style>
