const createApp = require('../app')
const supertest = require('supertest')()
const { inspect } = require('util')
const { readFileSync } = require('fs')
const { resolve } = require('path')

jest.mock('supertest')

describe('createApp', () => {
  let app

  beforeAll(() => {
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
          'x-api-key': 'foobar',
        },
      })

      expect(supertest.get().set).toHaveBeenCalledWith({ 'x-api-key': 'foobar' })
    })

    it('correctly sets multiple headers', async () => {
      await app.get('/users', {
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(supertest.get().set).toHaveBeenCalledWith({
        'x-api-key': 'foobar',
        'Content-Type': 'application/json',
      })
    })

    it('returns a properly formatted response', async () => {
      const response = await app.get('/users', {
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(200)
      expect(response.headers).toEqual({})
      expect(response.body).toEqual({
        users: [{ id: 1, name: 'Jon' }, { id: 2, name: 'Jane' }],
      })
    })
  })

  describe('post()', () => {
    it('performs a post request', async () => {
      await app.post('/users', {
        data: {
          name: 'Jon',
        },
      })

      expect(supertest.post).toHaveBeenCalledWith('/users')
      expect(supertest.post().set().send).toHaveBeenCalledWith({ name: 'Jon' })
    })

    it('correctly sets headers', async () => {
      await app.post('/users', {
        data: {},
        headers: {
          'x-api-key': 'foobar',
        },
      })

      expect(supertest.post().set).toHaveBeenCalledWith({ 'x-api-key': 'foobar' })
    })

    it('correctly sets multiple headers', async () => {
      await app.post('/users', {
        data: {},
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(supertest.post().set).toHaveBeenCalledWith({
        'x-api-key': 'foobar',
        'Content-Type': 'application/json',
      })
    })

    it('returns a properly formatted response', async () => {
      const response = await app.post('/users', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(200)
      expect(response.headers).toEqual({})
      expect(response.body).toEqual({
        user: { id: 1, name: 'Jon' },
      })
    })
  })

  describe('delete()', () => {
    it('performs a delete request', async () => {
      await app.delete('/users/1')

      expect(supertest.delete).toHaveBeenCalledWith('/users/1')
    })

    it('correctly sets headers', async () => {
      await app.delete('/users/1', {
        headers: {
          'x-api-key': 'foobar',
        },
      })

      expect(supertest.delete().set).toHaveBeenCalledWith({ 'x-api-key': 'foobar' })
    })

    it('correctly sets multiple headers', async () => {
      await app.delete('/users/1', {
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(supertest.delete().set).toHaveBeenCalledWith({
        'x-api-key': 'foobar',
        'Content-Type': 'application/json',
      })
    })

    it('returns a properly formatted response', async () => {
      const response = await app.delete('/users/1', {
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(200)
      expect(response.headers).toEqual({})
      expect(response.body).toEqual({
        user: { id: 1, status: 'deleted' },
      })
    })
  })

  describe('patch()', () => {
    it('performs a patch request', async () => {
      await app.patch('/users/1', {
        data: {
          name: 'Jon',
        },
      })

      expect(supertest.patch).toHaveBeenCalledWith('/users/1')
      expect(supertest.patch().set().send).toHaveBeenCalledWith({ name: 'Jon' })
    })

    it('correctly sets headers', async () => {
      await app.patch('/users/1', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
        },
      })

      expect(supertest.patch().set).toHaveBeenCalledWith({ 'x-api-key': 'foobar' })
    })

    it('correctly sets multiple headers', async () => {
      await app.patch('/users/1', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(supertest.patch().set).toHaveBeenCalledWith({
        'x-api-key': 'foobar',
        'Content-Type': 'application/json',
      })
    })

    it('returns a properly formatted response', async () => {
      const response = await app.patch('/users/1', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(200)
      expect(response.headers).toEqual({})
      expect(response.body).toEqual({
        user: { id: 1, name: 'Jon' },
      })
    })
  })

  describe('put()', () => {
    it('performs a put request', async () => {
      await app.put('/users/1', {
        data: {
          name: 'Jon',
        },
      })

      expect(supertest.put).toHaveBeenCalledWith('/users/1')
      expect(supertest.put().set().send).toHaveBeenCalledWith({ name: 'Jon' })
    })

    it('correctly sets headers', async () => {
      await app.put('/users/1', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
        },
      })

      expect(supertest.put().set).toHaveBeenCalledWith({ 'x-api-key': 'foobar' })
    })

    it('correctly sets multiple headers', async () => {
      await app.put('/users/1', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(supertest.put().set).toHaveBeenCalledWith({
        'x-api-key': 'foobar',
        'Content-Type': 'application/json',
      })
    })

    it('returns a properly formatted response', async () => {
      const response = await app.put('/users/1', {
        data: {
          name: 'Jon',
        },
        headers: {
          'x-api-key': 'foobar',
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(200)
      expect(response.headers).toEqual({})
      expect(response.body).toEqual({
        user: { id: 1, name: 'Jon' },
      })
    })
  })
})
