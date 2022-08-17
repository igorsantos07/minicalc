import 'svelte'
import App from './_App.svelte'
import './styles/main.scss'

const app = new App({
  target: document.getElementsByTagName('body')[0],
  // hydrate: true //used in a lot of examples - this is just an instruction on how to handle components from SSR
})

export default app
