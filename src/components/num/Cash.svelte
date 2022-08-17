<script>
  import Num from './index.svelte'

  export let prefix, n
</script>

<Num type="cash" {prefix} {n}/>
