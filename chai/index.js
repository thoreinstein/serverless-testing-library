module.exports = chai => {
  const { Assertion } = chai

  const contentTypes = {
    json: 'application/json',
    text: 'text/plain',
    html: 'text/html',
  }

  function getHeader(obj, key) {
    if (key) key = key.toLowerCase()
    if (obj.getHeader) return obj.getHeader(key)
    if (obj.headers) return obj.headers[key]
  }

  Assertion.addMethod('status', code => {
    const hasStatus = Object.keys(this._obj).include('status')

    new Assertion(hasStatus).assert(
      hasStatus,
      "expected #{act} to have key 'status'",
      null,
      hasStatus,
      this._obj,
      false
    )

    var status = this._obj.status

    this.assert(
      status == code,
      'expected #{this} to have status code #{exp} but got #{act}',
      'expected #{this} to not have status code #{act}',
      code,
      status
    )
  })

  Assertion.addMethod('header', function(key, value) {
    const header = getHeader(this._obj, key)

    if (arguments.length < 2) {
      this.assert(
        'undefined' !== typeof header || null === header,
        "expected header '" + key + "' to exist",
        "expected header '" + key + "' to not exist"
      )
    } else if (arguments[1] instanceof RegExp) {
      this.assert(
        value.test(header),
        "expected header '" + key + "' to match " + value + ' but got ' + i(header),
        "expected header '" + key + "' not to match " + value + ' but got ' + i(header),
        value,
        header
      )
    } else {
      this.assert(
        header == value,
        "expected header '" + key + "' to have value " + value + ' but got ' + i(header),
        "expected header '" + key + "' to not have value " + value,
        value,
        header
      )
    }
  })

  function checkContentType(name) {
    var val = contentTypes[name]

    Assertion.addProperty(name, function() {
      new Assertion(this._obj).to.have.headers
      var ct = getHeader(this._obj, 'content-type'),
        ins = i(ct) === 'undefined' ? 'headers' : i(ct)

      this.assert(
        ct && ~ct.indexOf(val),
        'expected ' + ins + " to include '" + val + "'",
        'expected ' + ins + " to not include '" + val + "'"
      )
    })
  }

  Object.keys(contentTypes).forEach(checkContentType)
}
