<script>
  import Router, { location } from 'svelte-spa-router'
  import * as Routes from './routes'
  import TabBar from '@smui/tab-bar'
  import Tab, { Label } from '@smui/tab'
  import { omit } from 'lodash-es'

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

<main style="display: flex; justify-content: center">
  <Router routes={Routes.forRouting()}/>
</main>
