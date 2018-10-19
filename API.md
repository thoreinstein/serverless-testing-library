# serverless-testing-library

## Table of Contents

1. [Methods](#methods)
   - [test()](#testconfig-string-app)
   - [get()](#getpath-string-options-responseoptions-promiseresponse)
   - [post()](#postpath-string-options-requestoptions-promiseresponse)
   - [patch()](#patchpath-string-options-requestoptions-promiseresponse)
   - [put()](#putpath-string-options-requestoptions-promiseresponse)
   - [delete()](#deletepath-string-options-requestoptions-promiseresponse)
2. [Types](#types)
   - [App](#app)
   - [Response](#response)
   - [RequestOptions](#request-options)
3. [Test Helpers](#test-helpers)
   - [Chai assertions](#chai)
   - [Jest matchers](#jest)

## Methods

### test(config: [string]): [App](#app)

`test()` is the only method directly exported by the library. It is referenced as such:

```javascript
const test = require('serverless-testing-library')
```

By default, the `test()` will look in your project root for a file named `serverless.yml` that defines your [serverless] project. It is possible to override this config by passing a string that will resolve to a serverless definition relative to your project root. This is useful for larger projects that may define different API's in subdirectories.

```javascript
//…
const userAPI = test('./users/serverless.yml')
const notesAPI = test('./notes/api.yml')
```

### get(path: [string], [options: [RequestOptions](#request-options)]): [Promise]<[Response](#response)>

### post(path: [string], options: [RequestOptions](#request-options)): [Promise]<[Response](#response)>

### patch(path: [string], options: [RequestOptions](#request-options)): [Promise]<[Response](#response)>

### put(path: [string], options: [RequestOptions](#request-options)): [Promise]<[Response](#response)>

### delete(path: [string], [options: [RequestOptions](#request-options)]): [Promise]<[Response](#response)>

## Types

### App

```typescript
{
    delete(path: string, options?: RequestOptions): Promise<Response>
    get(path: string, options?: RequestOptions): Promise<Response>
    patch(path: string, options?: RequestOptions): Promise<Response>
    post(path: string, options?: RequestOptions): Promise<Response>
    put(path: string, options?: RequestOptions): Promise<Response>
}
```

### Response

```typescript
{
    body: [property: string]: any
    headers: [header: string]: string,
    status: number,
}
```

### Request Options

```typescript
{
   data: [property: string]: any,
   headers: [header: string]: string
}
```

## Test Helpers

## Chai

### status(code: [number])

### header(key: [string], [value: [string]])

### json()

## Jest

### toHaveStatus(code: [number])

### toHaveHeader(key: [string], [value: [string]])

### toBeJson()

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[serverless]: https://serverless.com
