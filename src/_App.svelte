<script>
  import Tab, { Label } from '@smui/tab'
  import TabBar from '@smui/tab-bar'
  import { omit } from 'lodash-es'
  import Router, { location } from 'svelte-spa-router'
  import * as Routes from './routes'

  const tabs = omit(Routes.forNavigating(), ['Home'])
  let active = Object.entries(tabs).find(([, path]) => path === $location)
  active = active? active[0] : ''

  $: document.title = `${active} [MiniCalc]`
</script>

<TabBar tabs={Object.keys(tabs)} let:tab bind:active>
  <Tab {tab} href="#{tabs[tab]}">
    <Label>{tab}</Label>
  </Tab>
</TabBar>

<Router routes={Routes.forRouting()}/>
