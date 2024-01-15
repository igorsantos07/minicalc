export default class Result {

  #key
  #label
  value

  static TYPE = Object.freeze({
    LCI_PRE: 'LCI_PRE',
    CDB_PRE: 'CDB_PRE',
    LCI_POS: 'LCI_POS',
    CDB_POS: 'CDB_POS',
  })

  constructor(key, label, value = undefined) {
    this.#key   = key
    this.#label = label
    this.value  = value
  }

  get key() { return this.#key }

  get label() { return this.#label }

}
