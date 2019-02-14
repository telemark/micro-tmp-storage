const { readFileSync } = require('fs')
const marked = require('marked')
const uuid = require('uuid-random')
const { parse } = require('url')
const { send, json } = require('micro')
const saveToStorage = require('./lib/save-to-storage')
const getFromStorage = require('./lib/get-from-storage')
const logger = require('./lib/logger')

module.exports = async (request, response) => {
  const { pathname, query } = await parse(request.url, true)
  const data = request.method === 'POST' ? await json(request) : query

  if (request.method === 'POST') {
    const value = data.value || ''
    const ttl = data.ttl ? parseInt(data.ttl, 10) : 60
    const key = uuid()
    const success = await saveToStorage({ key: key, value: value })
    const result = {
      key: key,
      value: value,
      ttl: ttl,
      success: success
    }

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    logger('info', ['index', 'POST', key])
    send(response, 200, result)
  } else if (pathname !== '/') {
    const key = /storage/.test(pathname) ? pathname.replace('/storage/', '') : pathname.replace('/', '')
    const data = await getFromStorage(key)
    const code = data !== null ? 200 : 404
    const result = {
      key: key,
      value: data !== null ? data.value : false
    }
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET')
    logger('info', ['index', 'GET', 'key', key, 'code', code])
    send(response, code, result)
  } else {
    response.setHeader('Content-Type', 'text/html')
    const readme = readFileSync(`${__dirname}/README.md`, 'utf-8')
    logger('info', ['index', 'GET', 'frontpage'])
    send(response, 200, marked(readme))
  }
}
