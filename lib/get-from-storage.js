const mongojs = require('mongojs')
const logger = require('./logger')

module.exports = key => {
  return new Promise(async (resolve, reject) => {
    const db = mongojs(process.env.MONGODB_CONNECTION)
    const items = db.collection(process.env.MONGODB_COLLECTION)
    items.findOne({ key: key }, (error, document) => {
      db.close()
      if (error) {
        logger('error', ['get-from-storage', 'key', key, error])
        return resolve(false)
      } else {
        logger('info', ['get-from-storage', 'key', key, 'success'])
        return resolve(document)
      }
    })
  })
}
