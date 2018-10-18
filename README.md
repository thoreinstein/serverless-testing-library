# serverless-testing-library

[![Build Status](https://travis-ci.com/janders223/serverless_testing_library.svg?branch=master)](https://travis-ci.com/janders223/serverless_testing_library)
[![Maintainability](https://api.codeclimate.com/v1/badges/962b8a5f4766a6269bee/maintainability)](https://codeclimate.com/github/janders223/serverless_testing_library/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/962b8a5f4766a6269bee/test_coverage)](https://codeclimate.com/github/janders223/serverless_testing_library/test_coverage)

`serverless-testing-library` makes it easier to write integration and smoke tests for your [serverless] APIs.

## Usage

A simple request.

```javascript
const test = require(‘serverless-testing-library’);

it(‘gets a 200 response’, async () => {
  const app = test()

  const response = await app.get('/')

  assert.equal(response.status, 200)
  assert.equal(response.body.foo, 'bar')
})
```

Here, we import the top-level function `test` from `serverless-testing-library` and call it. This method reads the serverless configuration file in the root of your project and configures a simple [express] server wrapped in some convenient testing methods. We then call the `get` method, passing it a URL path that exists on our API. The `response` object returned from `get` contains the HTTP status code and parsed header and body objects.

`serverless-testing-library` supports the 5 major [HTTP methods]: `GET`, `DELETE`, `PATCH`, `POST` and `PUT`. Each method called on the `app` instance returns a Promise to be handled in your tests.

The `test` method optionally accepts a serverless configuration file path:

```javascript
const app = test('my_api.yml') // resolves <project_root>/my_api.yml
const app = test('foo/api.yml') // resolves <project_root>/foo/api.yml
```

If you are testing a project that lives outside of your project root, resolve the path to the serverless configuration file:

```javascript
const path = require('path')
const test = require('serverless-testing-library')

const filePath = path.resolve(process.cwd(), '../other-project/serverless.yml')

const app = test(filePath)
```

## Chai Assertions

For those using [mocha] and [chai] to test their API's, `serverless-testing-library` ships with a simple set of chai assertions.

```javascript
const chai = require('chai')
const stlChai = require('serverless-testing-library/chai')

chai.use(stlChai)
```

You can then use the assertions like so:

```javascript
expect(response).to.have.status(200)
expect(response).to.have.header('x-api-key')
expect(response).to.be.json
```

## Jest Asssertions

Jest users are not left out: `serverless-testing-library` also ships with the same matchers for jest.

```javascript
// test.setup.js

require('serverless-testing-library/jest')
```

Then configure jest to use the above setup script in either the `jest` key of `package.json` or `jest.config.js`:

```json
// package.json
"jest": {
    "setupTestFrameworkScriptFile": "./test.setup.js"
}
```

Then use it in your test:

```javascript
expect(response).toHaveStatus(200)
expect(response).toHaveHeader('x-api-key')
expect(response).toBeJson()
```

## Acknowledgements

`serverless-testing-library` is heavily inspired by [chai-http]. The name for this library was inspired by [react-testing-library].

## License

See `[LICENSE]`

[serverless]: https://serverless.com/
[express]: https://expressjs.com/
[http methods]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
[mocha]: https://mochajs.org/
[chai]: https://www.chaijs.com/
[chai-http]: http://www.chaijs.com/plugins/chai-http/
[react-testing-library]: https://github.com/kentcdodds/react-testing-library
[license]: https://github.com/janders223/serverless-testing-library/blob/master/LICENSE
