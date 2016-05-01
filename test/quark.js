const Quark = require('../index')
const should = require('should')
const path = require('path')
const proton = {
  app: {
    path: path.join(__dirname, '/api')
  }
}

function config(proton) {
  const configPath = path.join(proton.app.path, '/config')
  proton.app.config = require('require-all')(configPath)
  return proton
}

describe('Quark test', () => {

  it('should initialize quark and expose test connection to Redis', done => {
    const quark = new Quark(config(proton))
    quark.validate()
    quark.configure()
    quark.initialize()
    global.should.have.property('test')
    proton.app.redis.should.have.property('test')
    done()
  })

  it('should set key:value pair in Redis', done => {
    test.set('foo', 'barsomething')
    done()
  })

  it('should get the value associated to a key previously set in Redis', done => {
    test.get('foo')
    .then(result => {
      console.log(result)
      test.disconnect()
      done()
    })
    .catch(err => done(err))
  })
})
