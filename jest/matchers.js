const { matcherHint, printReceived, printExpected } = require('jest-matcher-utils')
const diff = require('jest-diff')

const toHaveStatus = (response, status) => {
  return {
    message: () =>
      matcherHint('.toHaveStatus', 'received', 'expected', {}) +
      '\n\n' +
      'Expected: ' +
      printExpected(status) +
      '\n' +
      'Received: ' +
      printReceived(response.status) +
      '\n',
    pass: response.status === status,
  }
}

const toHaveHeader = (response, ...header) => {
  if (header.length === 1) {
    return {
      message: () =>
        matcherHint('.toHaveHeader', 'received', 'expected', {}) +
        '\n\n' +
        'Expected: ' +
        printReceived(response.headers) +
        '\n' +
        'To contain header ' +
        printExpected(header) +
        '\n',
      pass: Object.keys(response.headers)
        .map(h => h.toLowerCase())
        .includes(header[0]),
    }
  }

  return {
    message: () =>
      matcherHint('.toHaveHeader', 'received', 'expected', {}) +
      '\n\n' +
      'Expected: ' +
      printExpected(header[0]) +
      ':' +
      printExpected(header[1]) +
      '\n' +
      'Received: ' +
      printReceived(header[0]) +
      ':' +
      printExpected(response.headers[header[0]]) +
      '\n',
    pass: Object.keys(response.headers)
      .map(h => h.toLowerCase())
      .includes(header[0]),
  }
}

const toBeJson = response => {
  const contentType = response.headers['Content-Type'] || response.headers['content-type']

  return {
    message: () =>
      matcherHint('.toBeJson', 'received', undefined, {}) +
      '\n\n' +
      'Expected: ' +
      printExpected(contentType) +
      " to be 'application/json'",
    pass: contentType.includes('application/json'),
  }
}

module.exports = {
  toHaveStatus,
  toHaveHeader,
  toBeJson,
}
