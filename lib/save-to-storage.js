const mongojs = require('mongojs')
const logger = require('./logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const db = mongojs(process.env.MONGODB_CONNECTION)
    const items = db.collection(process.env.MONGODB_COLLECTION)
    items.save(data, (error, document) => {
      db.close()
      if (error) {
        logger('error', ['get-from-storage', 'key', data.key, error])
        return resolve(false)
      } else {
        logger('info', ['get-from-storage', 'key', data.key, 'success'])
        return resolve(true)
      }
    })
  })
}
