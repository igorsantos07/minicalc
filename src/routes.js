import { fromPairs, map, mapValues } from 'lodash-es'
import Comparator from './Comparator.svelte'
import Diff from './Diff.svelte'
import Home from './Home.svelte'
import Installments from './Installments.svelte'
import Interest from './Interest.svelte'

const routes = {
  '/'    : ['Home', Home],
  '/diff': ['Diferença', Diff], //icon idea: +/-
  '/juros': ['Juros', Interest], //icon idea: %
  '/renda-fixa': ['RF', Comparator], //icon idea...?
  '/parcelado': ['Parcelado', Installments], //icon idea...?
}

/**
 * Returns Title => URL
 * @returns {Object}
 */
export const forNavigating = () => fromPairs(map(routes, ([title], key) => [title, key]))

/**
 * Returns URL => Component
 * @returns {Object}
 */
export const forRouting = () => mapValues(routes, ([,component]) => component)
