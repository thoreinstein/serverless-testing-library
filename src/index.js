const { resolve } = require('path')
const { readFileSync } = require('fs')
const createApp = require('./app')

module.exports = (config = 'serverless.yml') => {
  const path = resolve(process.cwd(), config)

  const svConfig = readFileSync(path, 'utf8')

  return createApp(svConfig)
}
