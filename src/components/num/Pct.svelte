<script>
  import Num from './index.svelte'

  export let prefix, n
</script>

<Num type="pct" {prefix} {n}/>
