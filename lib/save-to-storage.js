const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async data => {
  const db = await mongo()
  const items = db.collection(process.env.MONGODB_COLLECTION)
  return new Promise((resolve, reject) => {
    items.insertOne(data, (error, document) => {
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
