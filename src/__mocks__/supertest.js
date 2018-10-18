let supertest = jest.genMockFromModule('supertest')

const get = jest.fn().mockReturnValue(
  new Promise(resolve => {
    resolve({
      status: 200,
      headers: {},
      body: JSON.stringify({
        users: [{ id: 1, name: 'Jon' }, { id: 2, name: 'Jane' }],
      }),
    })
  })
)

const foo = () => {
  this.get = get
  this.set = jest.fn()

  return this
}

supertest = foo

module.exports = supertest
