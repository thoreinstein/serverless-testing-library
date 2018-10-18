const express = require('express')
const request = require('supertest')
const yaml = require('js-yaml')
const bodyParser = require('body-parser')
const { resolve } = require('path')

const configureServer = config => {
  const serverless = yaml.safeLoad(config)

  const server = express()

  server.use(bodyParser.json())

  const foo = Object.entries(serverless.functions).forEach(([name, fn]) => {
    const event = fn.events.filter(e => {
      return Object.keys(e).includes('http')
    })[0].http

    const handlerPath = resolve(process.cwd(), fn.handler).split('.')

    const handle = require(handlerPath[0])

    const handler = handle[handlerPath[1]]

    const path = event.path.replace(/{(.*?)}/, ':$1')

    server[event.method](`/${path}`, async (req, res) => {
      const event = {
        headers: req.headers,
        path: req.url,
        httpmethod: req.method,
        pathParameters: req.params,
        querystringparameters: req.query,
        body: JSON.stringify(req.body),
        resource: '',
        stagevariables: {},
        requestcontext: {},
      }

      const response = await handler(event)

      res
        .set({ ...response.headers })
        .status(response.statusCode)
        .json(response.body)
    })
  })

  return server
}

const get = server => {
  return (path, options = {}) => {
    const req = request(server)
    const { headers } = options

    return new Promise(async (resolve, reject) => {
      if (headers) {
        for (let header in headers) {
          req.set(header, headers[header])
        }
      }

      const response = await req.get(path)
      resolve({
        status: response.status,
        headers: response.headers,
        body: JSON.parse(response.body),
      })
    })
  }
}

const post = server => {
  return (path, options = {}) => {
    const req = request(server)
    const { data, headers } = options
    return new Promise(async (resolve, reject) => {
      if (headers) {
        for (let header in headers) {
          req.set(header, headers[header])
        }
      }

      const response = await req.post(path).send({ ...data })

      resolve({
        status: response.status,
        headers: response.headers,
        body: JSON.parse(response.body),
      })
    })
  }
}

const patch = server => {
  return (path, options = {}) => {
    const req = request(server)
    const { data, headers } = options
    return new Promise(async (resolve, reject) => {
      if (headers) {
        for (let header in headers) {
          req.set(header, headers[header])
        }
      }

      const response = await req.patch(path).send({ ...data })

      resolve({
        status: response.status,
        headers: response.headers,
        body: JSON.parse(response.body),
      })
    })
  }
}

const put = server => {
  return (path, options = {}) => {
    const req = request(server)
    const { data, headers } = options
    return new Promise(async (resolve, reject) => {
      if (headers) {
        for (let header in headers) {
          req.set(header, headers[header])
        }
      }

      const response = await req.put(path).send({ ...data })

      resolve({
        status: response.status,
        headers: response.headers,
        body: JSON.parse(response.body),
      })
    })
  }
}

const del = server => {
  return (path, options = {}) => {
    const req = request(server)
    const { headers } = options
    return new Promise(async (resolve, reject) => {
      if (headers) {
        for (let header in headers) {
          req.set(header, headers[header])
        }
      }

      const response = await req.delete(path)

      resolve({
        status: response.status,
        headers: response.headers,
        body: JSON.parse(response.body),
      })
    })
  }
}

module.exports = config => {
  const server = configureServer(config)

  return {
    get: get(server),
    post: post(server),
    put: put(server),
    patch: patch(server),
    delete: del(server),
  }
}
