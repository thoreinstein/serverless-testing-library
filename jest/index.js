const matchers = require('./matchers')

const jestExpect = global.expect

if (jestExpect !== undefined) {
  jestExpect.extend(matchers)
} else {
  /* eslint-disable no-console */
  console.error(
    "Unable to find Jest's global expect." +
      '\nPlease check you have added serverless_testing_library correctly to your jest configuration.' +
      '\nSee https://github.com/janders223/serverless_testing_library#jest-asssertions for help.'
  )
  /* eslint-enable no-console */
}
