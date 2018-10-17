const express = require('express')
const yaml = require('js-yaml')
const bodyParser = require('body-parser')
const { resolve } = require('path')

class App {
  constructor(config) {
    this.server = express()

    this.configureServer(config)
  }

  configureServer (config) {
    const serverless = yaml.safeLoad(config)

    this.server.use(bodyParser.json())

    console.log(Object.entries(serverless.functions).length)
    const foo = Object.entries(serverless.functions).forEach(([name, fn]) => {
      console.log(name)
      const event = fn.events.filter(e => {
        return Object.keys(e).includes('http')
      })[0].http

      const handlerPath = resolve(process.cwd(), fn.handler).split('.')

      const handle = require(handlerPath[0])

      const handler = handle[handlerPath[1]]

      const path = event.path.replace(/{(.*?)}/, ':$1')

      this.server[event.method](`/${path}`, async (req, res) => {
        const event = {
          headers: req.headers,
          path: req.url,
          httpmethod: req.method,
          pathparams: req.params,
          querystringparameters: req.query,
          body: JSON.stringify(req.body),
          resource: '',
          stagevariables: {},
          requestcontext: {}
        }

        const response = await handler(event)

        res
          .set({ ...response.headers })
          .status(response.statuscode)
          .json(response.body)
      })
    })
  }

  get() {}
  delete() {}
  post() {}
  put() {}
  patch() {}
}

module.exports = config => {
  return new App(config)
}
