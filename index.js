'use strict'

const readFileSync = require('fs').readFileSync
const NodeCache = require('node-cache')
const cache = new NodeCache()
const marked = require('marked')
const uid = require('uuid/v4')
const { parse } = require('url')
const { send, json } = require('micro')

module.exports = async (request, response) => {
  const {pathname, query} = await parse(request.url, true)
  const data = request.method === 'POST' ? await json(request) : query

  if (request.method === 'POST') {
    const value = data.value || ''
    const ttl = data.ttl ? parseInt(data.ttl, 10) : 60
    const key = uid()
    const success = cache.set(key, value, ttl)
    const result = {
      key: key,
      value: value,
      ttl: ttl,
      success: success
    }

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET')

    send(response, 200, result)
  } else if (pathname !== '/') {
    const key = pathname.replace('/', '')
    const value = cache.get(key)
    const code = value ? 200 : 404
    const result = {
      key: key,
      value: value || false
    }
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET')
    send(response, code, result)
  } else {
    response.setHeader('Content-Type', 'text/html')
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
