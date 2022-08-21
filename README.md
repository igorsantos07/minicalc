# Minicalc

Eu frequentemente usava uma planilha do Google Sheets para fazer algumas contas rotineiras. Desisti de ficar preso a um programa complexo como o Sheets pra umas continhas, e resolvi estudar novas tecnologias pra implementar elas :)

O projeto é empacotado como uma extensão pro Chrome, mas também é acessível em [TODO].

>Nota: o projeto é documentado em português pois é mais fácil, porém os commits e a maior parte do código estão em inglês pois é no que estou mais acostumado a programar ¯\_(ツ)_/¯

## Techs usadas (#1)
- [Svelte+Vite](https://svelte.dev/): diferente do que eu estava acostumado (React). Parece simples, ágil, e talvez mais organizado. Principal fonte: [State of JS 2021](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks/).
- [SMUI](https://sveltematerialui.com/demo/layout-grid/): idem, e também tem muito mais Github stars que o Sveltestrap. E é só isso mesmo que me levou a escolher; a lib parece bem mais complexa de usar, colocar temas, e... não parece ter tree-shaking! (sério? instalar CADA componente separado???)
- [paleta verde-limão](https://www.materialpalette.com/green/lime) 1) pq sim 2) parece excel
- [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router): é mais clean rotear com um objeto JS do que com componentes JSX ([svelte-routing](https://github.com/EmilTholin/svelte-routing), [svelte-navigator](https://github.com/mefechoel/svelte-navigator)). Another, slightly more complex option could be [svelte-router](https://github.com/jorgegorka/svelte-router#layouts-and-route-info).

## Comandos principais
- `npm run init`: prepara tudo apõs o clone inicial
- `npm run dev`: dev server
  - `npm run dev -- --host`: aberto na rede
- `npm run build`: compila o JS e cria o ZIP pra enviar pro [Chrome Web Store Dev Console](https://chrome.google.com/webstore/devconsole)
- `npm run theme`: [compila o CSS do tema do Material UI](https://sveltematerialui.com/THEMING.md#building-your-theme). Necessário executar sempre que adicionar algum componente novo do SMUI, e quando clonar o projeto (os CSS gerados dificilmente mudam, mas estão ignorados).
