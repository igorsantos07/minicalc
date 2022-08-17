<script context="module">
  const currency = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const percent = Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 2
  })
</script>

<script>
  export let n
  export let prefix = ''
  /** @type "cash"|"pct" */
  export let type

  let fmt
  switch (type) {
    case 'cash': fmt = currency;  break
    case 'pct' : fmt = percent;   break
    default:
      throw Error(`Invalid Num type, given: ${type}`)
  }
</script>

<output>{prefix} {fmt.format(n)}</output>
