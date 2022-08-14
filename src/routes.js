import Home from './Home.svelte'
import Diff from './Diff.svelte'
import { fromPairs, map, mapValues } from 'lodash-es'

const routes = {
  '/'    : ['Home', Home],
  '/diff': ['Diferença', Diff],
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
