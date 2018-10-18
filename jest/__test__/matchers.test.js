const matchers = require('../matchers')

describe('matchers', () => {
  describe('toHaveStatus', () => {
    it('should pass if the status code is correct', () => {
      const { pass } = matchers.toHaveStatus({ status: 200 }, 200)

      expect(pass).toBeTruthy()
    })

    it('should fail if the status code is incorrect', () => {
      const { pass } = matchers.toHaveStatus({ status: 204 }, 200)

      expect(pass).toBeFalsy()
    })

    it('should have the correct message if it fails', () => {
      const { message } = matchers.toHaveStatus({ status: 204 }, 200)

      expect(message()).toMatchSnapshot()
    })
  })

  describe('toHaveHeader', () => {
    it('passes when headers contain string key', () => {
      const { pass } = matchers.toHaveHeader(
        {
          headers: {
            'x-api-key': 'foo',
          },
        },
        'x-api-key'
      )

      expect(pass).toBeTruthy()
    })

    it('passes when headers contain string key, case insensitively', () => {
      const { pass } = matchers.toHaveHeader(
        {
          headers: {
            'X-API-KEY': 'foo',
          },
        },
        'x-api-key'
      )

      expect(pass).toBeTruthy()
    })

    it('fails when headers does notcontain string key', () => {
      const { pass } = matchers.toHaveHeader(
        {
          headers: {
            'x-foo-bar': 'foo',
          },
        },
        'x-api-key'
      )

      expect(pass).toBeFalsy()
    })

    it('passes when header key and value match headers', () => {
      const { pass } = matchers.toHaveHeader(
        {
          headers: {
            'x-api-key': 'foo',
          },
        },
        'x-api-key',
        'foo'
      )

      expect(pass).toBeTruthy()
    })

    it('failes when header key and value do notmatch headers', () => {
      const { pass } = matchers.toHaveHeader(
        {
          headers: {
            'x-foo-bar': 'foo',
          },
        },
        'x-api-key',
        'foo'
      )

      expect(pass).toBeFalsy()
    })

    it('prints the correct message for key matches', () => {
      const { message } = matchers.toHaveHeader(
        {
          headers: {
            'x-foo-bar': 'foo',
          },
        },
        'x-api-key'
      )

      expect(message()).toMatchSnapshot()
    })

    it('prints the correct message for key, value matches', () => {
      const { message } = matchers.toHaveHeader(
        {
          headers: {
            'x-foo-bar': 'foo',
          },
        },
        'x-api-key',
        'foo'
      )

      expect(message()).toMatchSnapshot()
    })
  })

  describe('toBeJson', () => {
    it('passes if content-type is json', () => {
      const { pass } = matchers.toBeJson({
        headers: {
          'content-type': 'application/json',
        },
      })

      expect(pass).toBeTruthy()
    })

    it('passes if Content-Type is json', () => {
      const { pass } = matchers.toBeJson({
        headers: {
          'Content-Type': 'application/json',
        },
      })

      expect(pass).toBeTruthy()
    })

    it('fails if content-type is not json', () => {
      const { pass } = matchers.toBeJson({
        headers: {
          'content-type': 'text/plain',
        },
      })

      expect(pass).toBeFalsy()
    })

    it('fails if Content-Type is not json', () => {
      const { pass } = matchers.toBeJson({
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      expect(pass).toBeFalsy()
    })

    it('prints the correct message if fail', () => {
      const { message } = matchers.toBeJson({
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      expect(message()).toMatchSnapshot()
    })
  })
})
