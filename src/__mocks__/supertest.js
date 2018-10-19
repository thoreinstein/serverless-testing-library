let supertest = jest.genMockFromModule('supertest')

const get = jest.fn().mockReturnValue({
  set: jest.fn().mockReturnValue(
    new Promise(resolve => {
      resolve({
        status: 200,
        headers: {},
        body: JSON.stringify({
          users: [{ id: 1, name: 'Jon' }, { id: 2, name: 'Jane' }],
        }),
      })
    })
  ),
})

const post = jest.fn().mockReturnValue({
  set: jest.fn().mockReturnValue(this),
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

const patch = jest.fn().mockReturnValue({
  set: jest.fn().mockReturnValue({
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
  }),
})

const put = jest.fn().mockReturnValue({
  set: jest.fn().mockReturnValue({
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
  }),
})

const del = jest.fn().mockReturnValue({
  set: jest.fn().mockReturnValue(
    new Promise(resolve => {
      resolve({
        status: 200,
        headers: {},
        body: JSON.stringify({
          user: { id: 1, status: 'deleted' },
        }),
      })
    })
  ),
})

const test = () => {
  this.get = get
  this.post = post
  this.delete = del
  this.patch = patch
  this.put = put

  return this
}

supertest = test

module.exports = supertest
