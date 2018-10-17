const createApp = require('../app')
const { resolve } = require('path')
const { readFileSync } = require('fs')
const supertest = require('supertest')()
const { inspect } = require('util')

jest.mock('supertest')

describe('createApp', () => {
  let app

  beforeAll(() =>  {
    const path = resolve(process.cwd(), 'serverless.yml')
    const config = readFileSync(path, 'utf8')
    app = createApp(config)
  })

  describe('get()', () => {
    it('performs a get request', async () => {
      await app.get('/users')

      expect(supertest.get).toHaveBeenCalledWith('/users')
    })

    it('correctly sets headers', async () => {
      await app.get('/users', {
        headers: {
          'x-api-key': 'foobar'
        }
      })

      expect(supertest.set).toHaveBeenCalledWith('x-api-key', 'foobar')
    })

    it('correctly sets multiple headers', async () => {
      await app.get('/users', {
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        }
      })

      expect(supertest.set).toHaveBeenCalledWith('x-api-key', 'foobar')
      expect(supertest.set).toHaveBeenCalledWith('Content-Type', 'application/json')
    })

    it('returns a properly formatted response', async () => {
      const response = await app.get('/users', {
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        }
      })

      expect(response.status).toBe(200)
      expect(response.headers).toEqual({})
      expect(response.body).toEqual({
        users: [
          { id: 1, name: 'Jon' },
          { id: 2, name: 'Jane' }
        ]
      })
    })
  })
})
