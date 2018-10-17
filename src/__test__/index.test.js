const test = require('../')

describe('test', () => {
  it('throws if the serverless config is not found', () => {
    expect(() => {
      test('foo/api.yml')
    }).toThrow(/ENOENT/)
  })

  it('returns the app object', () => {
    expect(test()).toBeDefined()
  })

  it('the app object has the http methods', () => {
    const app = test()

    expect(app.get).toBeDefined()
    expect(app.delete).toBeDefined()
    expect(app.post).toBeDefined()
    expect(app.put).toBeDefined()
    expect(app.patch).toBeDefined()
  })
})
