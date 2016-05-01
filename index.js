'use strict'

const Quark = require('proton-quark')
const Redis = require('ioredis')

class RedisQuark extends Quark {

  constructor(proton) {
    super(proton)
  }

  validate() {

  }

  configure() {
    if(!this.proton.app.redis) this.proton.app.redis = {}
  }

  initialize() {
    const connections = this._connections
    for(let name in connections) {
      if(!connections.hasOwnProperty(name)) continue
      this._exposeConnection(name, new Redis(connections[name]))
    }
  }

  get _connections() {
    return this.proton.app.config.redis || {}
  }

  _exposeConnection(name, connection) {
    this.proton.app.redis[name] = global[name] = connection
  }
}

module.exports = RedisQuark
