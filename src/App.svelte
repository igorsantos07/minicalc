<script>
  import Router from 'svelte-spa-router'
  import routes from './routes'
</script>

<nav>
  <ul>
    <li><a href="#/">Home</a></li>
    <li><a href="#/diff">Diff</a></li>
  </ul>
</nav>
<Router {routes}/>
