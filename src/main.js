import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementsByTagName('body')[0],
  // hydrate: true //TODO saw this in some examples, but not sure of what it is yet?
})

export default app
