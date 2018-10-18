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

const post = jest.fn().mockReturnValue({
  send: jest.fn().mockReturnValue(
    new Promise(resolve => {
      resolve({
        status: 200,
        headers: {},
        body: JSON.stringify({
          user: { id: 1, name: 'Jon' },
        }),
      })
    })
  ),
})

const foo = () => {
  this.get = get
  this.post = post
  this.set = jest.fn()

  return this
}

supertest = foo

module.exports = supertest
