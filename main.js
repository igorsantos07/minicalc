function yearly2monthly(yearly) {
  return Math.pow(1 + yearly, 1/12) -1
}

function money(value) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function percent(value) {
  return Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 3
  }).format(value)
}

const rendAnterior = document.querySelector('#rend_anterior')
const rendAtual    = document.querySelector('#rend_atual')
const rendResReal  = document.querySelector('#rend_res_real')
const rendResPct   = document.querySelector('#rend_res_pct')
const rendCard     = document.querySelector('#rendimento .card')
function rendimento() {
  const valor = rendAtual.value - rendAnterior.value
  const pct = valor / rendAnterior.value
  rendResReal.textContent = money(valor)
  rendResPct.textContent = percent(pct)

  rendCard.classList.add(valor >= 0? 'has-text-success' : 'has-text-danger')
  rendCard.classList.remove(valor < 0? 'has-text-success' : 'has-text-danger')
}

rendAnterior.onkeyup = rendimento
rendAtual.onkeyup = rendimento