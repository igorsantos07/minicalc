<script>
  import Router, { location } from 'svelte-spa-router'
  import * as Routes from './routes'
  import TabBar from '@smui/tab-bar'
  import Tab, { Label } from '@smui/tab'

  const tabs = Routes.forNavigating()
  let active = Object.entries(tabs).find(([, path]) => path === $location)[0]
</script>

<TabBar tabs={Object.keys(tabs)} let:tab bind:active>
  <Tab {tab} href="#{tabs[tab]}">
    <Label>{tab}</Label>
  </Tab>
</TabBar>

<Router routes={Routes.forRouting()}/>
